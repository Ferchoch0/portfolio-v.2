import React from 'react';

/* ── Spacetime Grid (gravitational lensing effect) ── */
const GRID_COLS = 40;
const GRID_ROWS = 30;
const GRID_W = 1200;
const GRID_H = 800;
const CELL_W = GRID_W / GRID_COLS;
const CELL_H = GRID_H / GRID_ROWS;

// Black hole center in SVG coords (top-center)
const BH_X = GRID_W / 2;
const BH_Y = GRID_H * 0.08;
const WARP_STRENGTH = 45000;
const WARP_MIN_DIST = 60;

function warpPoint(x, y) {
    const dx = x - BH_X;
    const dy = y - BH_Y;
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), WARP_MIN_DIST);
    const force = WARP_STRENGTH / (dist * dist);
    const angle = Math.atan2(dy, dx);
    return {
        x: x + Math.cos(angle) * force * dist * 0.15,
        y: y + Math.sin(angle) * force * dist * 0.15,
    };
}

function buildPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
    }
    return d;
}

const gridPaths = (() => {
    const paths = [];
    // Horizontal lines
    for (let r = 0; r <= GRID_ROWS; r++) {
        const pts = [];
        for (let c = 0; c <= GRID_COLS; c++) {
            pts.push(warpPoint(c * CELL_W, r * CELL_H));
        }
        paths.push(buildPath(pts));
    }
    // Vertical lines
    for (let c = 0; c <= GRID_COLS; c++) {
        const pts = [];
        for (let r = 0; r <= GRID_ROWS; r++) {
            pts.push(warpPoint(c * CELL_W, r * CELL_H));
        }
        paths.push(buildPath(pts));
    }
    return paths;
})();

export default function SpacetimeGrid() {
    return (
        <div className="fd-hero--grid-container">
            <svg
                className="fd-hero--grid-svg"
                viewBox={`0 0 ${GRID_W} ${GRID_H}`}
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {gridPaths.map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        fill="none"
                        stroke="rgba(191, 163, 255, 0.12)"
                        strokeWidth="0.8"
                    />
                ))}
            </svg>
        </div>
    );
}
