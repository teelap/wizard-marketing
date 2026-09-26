/**
 * Page-curl geometry for the tome.
 *
 * A turning page is modelled as a flat sheet folded along one straight line.
 * Drag a corner to point P and the fold is the perpendicular bisector of the
 * segment from the corner's resting spot to P: every point on the corner's
 * side of that line is lifted and mirrored across it. The underside of the
 * lifted flap is the *next* page, which lives on the other side of the spine,
 * so its on-screen position is two reflections composed: first across the
 * spine (to put it under the current page), then across the fold.
 *
 * Everything here is pure math on plain objects so it can be unit-tested
 * without a DOM.
 */

export interface Vec {
    readonly x: number;
    readonly y: number;
}

/** 2D affine map in CSS `matrix(a, b, c, d, e, f)` order: x' = a·x + c·y + e, y' = b·x + d·y + f. */
export interface Affine {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly e: number;
    readonly f: number;
}

export interface Rect {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
}

export type Polygon = readonly Vec[];

export const vec = (x: number, y: number): Vec => ({ x, y });
export const add = (p: Vec, q: Vec): Vec => vec(p.x + q.x, p.y + q.y);
export const sub = (p: Vec, q: Vec): Vec => vec(p.x - q.x, p.y - q.y);
export const scale = (p: Vec, k: number): Vec => vec(p.x * k, p.y * k);
export const dot = (p: Vec, q: Vec): number => p.x * q.x + p.y * q.y;
export const length = (p: Vec): number => Math.hypot(p.x, p.y);
export const lerp = (p: Vec, q: Vec, t: number): Vec => vec(p.x + (q.x - p.x) * t, p.y + (q.y - p.y) * t);

export const IDENTITY: Affine = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

export function apply(m: Affine, p: Vec): Vec {
    return vec(m.a * p.x + m.c * p.y + m.e, m.b * p.x + m.d * p.y + m.f);
}

/** Returns `outer ∘ inner`: apply `inner` first, then `outer`. */
export function compose(outer: Affine, inner: Affine): Affine {
    return {
        a: outer.a * inner.a + outer.c * inner.b,
        b: outer.b * inner.a + outer.d * inner.b,
        c: outer.a * inner.c + outer.c * inner.d,
        d: outer.b * inner.c + outer.d * inner.d,
        e: outer.a * inner.e + outer.c * inner.f + outer.e,
        f: outer.b * inner.e + outer.d * inner.f + outer.f,
    };
}

export function translation(t: Vec): Affine {
    return { a: 1, b: 0, c: 0, d: 1, e: t.x, f: t.y };
}

/** Mirror across the line through `point` running along `direction` (any non-zero length). */
export function reflection(point: Vec, direction: Vec): Affine {
    const len = length(direction);
    if (len === 0) throw new RangeError('reflection needs a non-zero direction');
    const ux = direction.x / len;
    const uy = direction.y / len;
    const cos2 = ux * ux - uy * uy;
    const sin2 = 2 * ux * uy;
    // Linear part [[cos2, sin2], [sin2, -cos2]], then fix the line's point in place.
    const linear: Affine = { a: cos2, b: sin2, c: sin2, d: -cos2, e: 0, f: 0 };
    const moved = apply(linear, point);
    return { ...linear, e: point.x - moved.x, f: point.y - moved.y };
}

export function rectPolygon(r: Rect): Polygon {
    return [vec(r.x, r.y), vec(r.x + r.w, r.y), vec(r.x + r.w, r.y + r.h), vec(r.x, r.y + r.h)];
}

/**
 * Sutherland–Hodgman against one half-plane: keeps the points X where
 * sign · dot(X − origin, normal) ≥ 0. Works for any convex polygon.
 */
export function clipHalfPlane(poly: Polygon, origin: Vec, normal: Vec, sign: 1 | -1): Polygon {
    const side = (p: Vec): number => sign * dot(sub(p, origin), normal);
    const out: Vec[] = [];
    for (let i = 0; i < poly.length; i += 1) {
        const cur = poly[i];
        const next = poly[(i + 1) % poly.length];
        const sc = side(cur);
        const sn = side(next);
        if (sc >= 0) out.push(cur);
        if ((sc >= 0) !== (sn >= 0)) {
            const t = sc / (sc - sn);
            out.push(lerp(cur, next, t));
        }
    }
    return out;
}

/** Pull `p` back inside the circle of radius `r` around `center`. */
export function clampToCircle(p: Vec, center: Vec, r: number): Vec {
    const d = sub(p, center);
    const len = length(d);
    return len <= r || len === 0 ? p : add(center, scale(d, r / len));
}

export interface Leaf {
    /** The turning sheet, in stage coordinates. */
    readonly rect: Rect;
    /** x of the spine the sheet is bound to. */
    readonly spineX: number;
    /** The corner being dragged, at rest. */
    readonly corner: Vec;
}

/**
 * Paper can't stretch: the grabbed corner stays within one page-width of the
 * spine end on its own edge, and within one page-diagonal of the other end.
 */
export function constrainPointer(leaf: Leaf, pointer: Vec): Vec {
    const { rect, spineX, corner } = leaf;
    const sameEdge = vec(spineX, corner.y);
    const otherEdge = vec(spineX, corner.y === rect.y ? rect.y + rect.h : rect.y);
    const diagonal = Math.hypot(rect.w, rect.h);
    let p = pointer;
    // Two passes settle the point inside the intersection of both circles.
    for (let i = 0; i < 2; i += 1) {
        p = clampToCircle(p, sameEdge, rect.w);
        p = clampToCircle(p, otherEdge, diagonal);
    }
    return p;
}

export interface Fold {
    /** Where the dragged corner now sits (after constraints). */
    readonly pointer: Vec;
    /** A point on the fold line (the bisector's midpoint). */
    readonly origin: Vec;
    /** Unit normal of the fold line, pointing from the resting corner toward the pointer. */
    readonly normal: Vec;
    /** Part of the sheet still lying flat, stage coordinates. */
    readonly flat: Polygon;
    /** Part of the sheet lifted off the page (its resting position), stage coordinates. */
    readonly lifted: Polygon;
    /** Maps the next page from its own resting place onto the lifted flap. */
    readonly backMatrix: Affine;
    /** Same as `lifted`, expressed where the next page rests (mirrored across the spine). */
    readonly liftedOnBack: Polygon;
    /** 0 when resting, 1 when the corner has swung all the way across the spine. */
    readonly progress: number;
}

export function computeFold(leaf: Leaf, rawPointer: Vec): Fold | null {
    const pointer = constrainPointer(leaf, rawPointer);
    const travel = sub(pointer, leaf.corner);
    const distance = length(travel);
    if (distance < 0.5) return null;

    const normal = scale(travel, 1 / distance);
    const origin = lerp(leaf.corner, pointer, 0.5);
    const sheet = rectPolygon(leaf.rect);
    const flat = clipHalfPlane(sheet, origin, normal, 1);
    const lifted = clipHalfPlane(sheet, origin, normal, -1);

    const spine = reflection(vec(leaf.spineX, 0), vec(0, 1));
    const fold = reflection(origin, vec(-normal.y, normal.x));
    const backMatrix = compose(fold, spine);
    const liftedOnBack = lifted.map((p) => apply(spine, p));

    const span = 2 * leaf.rect.w;
    const dir = Math.sign(leaf.corner.x - leaf.spineX) || 1;
    const progress = Math.min(1, Math.max(0, ((leaf.corner.x - pointer.x) * dir) / span));

    return { pointer, origin, normal, flat, lifted, backMatrix, liftedOnBack, progress };
}

/** Where the corner lands when the page has fully turned: its mirror image across the spine. */
export function landingPoint(leaf: Leaf): Vec {
    return vec(2 * leaf.spineX - leaf.corner.x, leaf.corner.y);
}

/** CSS `polygon()` for points given relative to an element's top-left at `offset`. */
export function toClipPath(poly: Polygon, offset: Vec): string {
    if (poly.length < 3) return 'polygon(0 0, 0 0, 0 0)';
    return `polygon(${poly.map((p) => `${(p.x - offset.x).toFixed(2)}px ${(p.y - offset.y).toFixed(2)}px`).join(', ')})`;
}

/** CSS `matrix()` for an element whose layout box starts at `home`, with transform-origin 0 0. */
export function toCssMatrix(m: Affine, home: Vec): string {
    // Stage transform T(X) = A·X + t. For X = home + local, the element's own
    // matrix must carry A plus a translation of (A·home + t − home).
    const moved = apply(m, home);
    const e = moved.x - home.x;
    const f = moved.y - home.y;
    const n = (v: number): string => (Math.abs(v) < 1e-9 ? '0' : v.toFixed(6));
    return `matrix(${n(m.a)}, ${n(m.b)}, ${n(m.c)}, ${n(m.d)}, ${e.toFixed(3)}, ${f.toFixed(3)})`;
}

/** Signed area; used by tests to check polygons don't gain or lose paper. */
export function area(poly: Polygon): number {
    let sum = 0;
    for (let i = 0; i < poly.length; i += 1) {
        const p = poly[i];
        const q = poly[(i + 1) % poly.length];
        sum += p.x * q.y - q.x * p.y;
    }
    return Math.abs(sum) / 2;
}
