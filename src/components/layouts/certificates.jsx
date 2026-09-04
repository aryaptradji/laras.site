"use client";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const certificates = [
    { id: 1, src: "/assets/certificates/dicoding-web.webp", w: 1, h: 1 },
    { id: 2, src: "/assets/certificates/metamorphoria.webp", w: 1, h: 1 },
    { id: 3, src: "/assets/certificates/ade.webp", w: 2, h: 4 },
    { id: 4, src: "/assets/certificates/qe-1.webp", w: 2, h: 2 },
    { id: 5, src: "/assets/certificates/sa-maganghub.webp", w: 2, h: 2 },
    { id: 6, src: "/assets/certificates/pembekalan-maganghub.webp", w: 1, h: 1 },
    { id: 7, src: "/assets/certificates/sniv.webp", w: 1, h: 1 },
    { id: 8, src: "/assets/certificates/mp.webp", w: 1, h: 1 },
    { id: 9, src: "/assets/certificates/metaverse.webp", w: 1, h: 1 },
    { id: 10, src: "/assets/certificates/sql.webp", w: 1, h: 1 },
    { id: 11, src: "/assets/certificates/uiux.webp", w: 1, h: 1 },
];

const GRID_COLS = 6;

function generateAreas(items, cols) {
    const matrix = [];
    const isFree = (row, col, w, h) => {
        if (col + w > cols) return false;
        for (let r = row; r < row + h; r++) {
            if (!matrix[r]) matrix[r] = new Array(cols).fill(null);
            for (let c = col; c < col + w; c++) {
                if (matrix[r][c]) return false;
            }
        }
        return true;
    };
    const place = (row, col, w, h, name) => {
        for (let r = row; r < row + h; r++) {
            if (!matrix[r]) matrix[r] = new Array(cols).fill(null);
            for (let c = col; c < col + w; c++) {
                matrix[r][c] = name;
            }
        }
    };

    items.forEach((item, i) => {
        const name = `t${i}`;
        let placed = false;
        let row = 0;
        while (!placed) {
            if (!matrix[row]) matrix[row] = new Array(cols).fill(null);
            for (let col = 0; col <= cols - item.w; col++) {
                if (isFree(row, col, item.w, item.h)) {
                    place(row, col, item.w, item.h, name);
                    placed = true;
                    break;
                }
            }
            row++;
        }
    });

    return matrix.map((row) => `"${row.map((cell) => cell || ".").join(" ")}"`).join(" ");
}

export default function Certificates() {
    const areas = generateAreas(certificates, GRID_COLS);
    const container = useRef(null);
    const itemRefs = useRef([]);

    useGSAP(() => {
        gsap.set(itemRefs.current, {
            opacity: 0,
            scale: 0.4,
        });

        gsap.to(itemRefs.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
                each: 0.08,
                from: "random",
            },
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);

    return (
        <section ref={container} className="px-[14%] pb-40 mx-auto w-full overflow-auto">
            <h2 className="text-xl font-medium text-foreground mb-10">
                Certificates
            </h2>
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                    gridAutoRows: "120px",
                    gridTemplateAreas: areas,
                }}
            >
                {certificates.map((cert, i) => (
                    <div
                        key={cert.id}
                        ref={(el) => (itemRefs.current[i] = el)}
                        className="relative rounded-xl overflow-hidden shadow-xl"
                        style={{ gridArea: `t${i}` }}
                    >
                        <Image
                            src={cert.src}
                            alt={`Certificate ${cert.id}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}