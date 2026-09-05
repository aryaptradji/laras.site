"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

const certificates = [
    {
        id: 1,
        src: "/assets/certificates/dicoding-web.webp",
        w: 1,
        h: 1,
        title: "Belajar Dasar Pemrograman Web",
        role: "Dicoding Academy",
        description: "Sertifikat kelulusan atas penyelesaian kelas dasar pemrograman web di Dicoding Academy.",
    },
    {
        id: 2,
        src: "/assets/certificates/metamorphoria.webp",
        w: 1,
        h: 1,
        title: "Metamorphoria",
        role: "Peserta",
        description: "Deskripsi singkat sertifikat ini.",
    },
    {
        id: 3,
        src: "/assets/certificates/ade.webp",
        w: 2,
        h: 4,
        title: "Certified Associate Data Engineer",
        role: "BNSP - Insinyur Data Madya",
        description: "Sertifikat kompetensi BNSP di bidang Sistem Manajemen Data dengan kualifikasi Associate Data Engineer.",
    },
    {
        id: 4,
        src: [
            "/assets/certificates/qe-1.jpg",
            "/assets/certificates/qe-2.jpg"
        ],
        w: 2,
        h: 2,
        title: "Top Search Quality Engineer",
        role: "MSIB Batch 5 - Alterra Academy",
        description: "Sertifikat kelulusan program MSIB sebagai peserta Search Quality Engineer.",
    },
    {
        id: 5,
        src: "/assets/certificates/sa-maganghub.webp",
        w: 2,
        h: 2,
        title: "Program Pemagangan Lulusan Perguruan Tinggi",
        role: "Analis Sistem - Kementerian Keuangan",
        description: "Sertifikat penyelesaian program pemagangan dengan predikat sangat baik.",
    },
    {
        id: 6,
        src: "/assets/certificates/pembekalan-maganghub.webp",
        w: 1,
        h: 1,
        title: "Pembekalan Essential Skills",
        role: "GNIK x Kemnaker",
        description: "Sertifikat pembekalan Emotional Intelligence dalam program magang nasional.",
    },
    {
        id: 7,
        src: "/assets/certificates/sniv.webp",
        w: 1,
        h: 1,
        title: "Seminar Nasional Inovasi Vokasi",
        role: "Panitia",
        description: "Sertifikat sebagai panitia SNIV 2024 di Politeknik Negeri Jakarta.",
    },
    {
        id: 8,
        src: "/assets/certificates/mp.webp",
        w: 1,
        h: 1,
        title: "Mars & Research School Project",
        role: "Staff Riset",
        description: "Sertifikat keanggotaan sebagai staff riset di UKM Politeknik Negeri Jakarta.",
    },
    {
        id: 9,
        src: "/assets/certificates/metaverse.webp",
        w: 1,
        h: 1,
        title: "Pengenalan Metaverse di Indonesia",
        role: "Kominfo x Thematic Academy",
        description: "Sertifikat pelatihan Metaverse 101 dalam program Digital Talent Scholarship.",
    },
    {
        id: 10,
        src: "/assets/certificates/sql.webp",
        w: 1,
        h: 1,
        title: "Kursus SQL",
        role: "Progate",
        description: "Sertifikat penyelesaian 4 study dan 1 latihan pada kursus dasar SQL.",
    },
    {
        id: 11,
        src: "/assets/certificates/uiux.webp",
        w: 1,
        h: 1,
        title: "UI/UX Challenge - Play IT",
        role: "Peserta",
        description: "Sertifikat sebagai peserta kategori UI/UX Challenge dalam kompetisi Play IT.",
    },
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

function getImages(cert) {
    return Array.isArray(cert.src) ? cert.src : [cert.src];
}

function getThumbnail(cert) {
    return getImages(cert)[0];
}

export default function Certificates() {
    const areas = generateAreas(certificates, GRID_COLS);
    const container = useRef(null);
    const itemRefs = useRef([]);
    const overlayRef = useRef(null);
    const modalRef = useRef(null);

    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true); // portal butuh document, cuma ada di client
    }, []);

    useGSAP(() => {
        gsap.set(itemRefs.current, { opacity: 0, scale: 0.4 });
        gsap.to(itemRefs.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: { each: 0.08, from: "random" },
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);

    useGSAP(() => {
        if (!visible || closing) return;
        if (!overlayRef.current || !modalRef.current) return;

        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
        );
    }, [visible, closing]);

    const openModal = (cert) => {
        setSelected(cert);
        setActiveIndex(0);
        setClosing(false);
        setVisible(true);
    };

    const closeModal = () => {
        if (!overlayRef.current || !modalRef.current) {
            setVisible(false);
            setSelected(null);
            return;
        }
        setClosing(true);
        gsap.to(modalRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: "power2.in" });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setVisible(false);
                setSelected(null);
                setClosing(false);
            },
        });
    };

    const images = selected ? getImages(selected) : [];
    const hasMultiple = images.length > 1;

    const goPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const modalContent = visible && selected && (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
            onClick={closeModal}
        >
            <div
                ref={modalRef}
                className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-red-500 hover:text-secondary rounded-full p-2 shadow-md transition-all duration-300 cursor-pointer"
                >
                    <FiX size={20} />
                </button>

                <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-neutral-100">
                    {hasMultiple && (
                        <span className="absolute top-4 left-4 z-20 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {activeIndex + 1}/{images.length}
                        </span>
                    )}

                    <Image
                        key={images[activeIndex]}
                        src={images[activeIndex]}
                        alt={`${selected.title} - ${activeIndex + 1}`}
                        fill
                        className="object-contain p-6"
                    />

                    {hasMultiple && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors duration-300 cursor-pointer"
                            >
                                <FiChevronLeft size={20} />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors duration-300 cursor-pointer"
                            >
                                <FiChevronRight size={20} />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? "bg-accent w-5" : "bg-white/70 hover:bg-white"
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full md:w-2/5 h-1/2 md:h-full p-10 flex flex-col justify-center overflow-y-auto">
                    <p className="text-md text-accent font-bold mb-2">{selected.role}</p>
                    <h3 className="text-3xl font-semibold text-foreground mb-4">{selected.title}</h3>
                    <p className="text-foreground-2 leading-relaxed">{selected.description}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section ref={container} className="relative z-3 px-[14%] pb-40 mx-auto w-full overflow-auto">
            <h2 className="text-xl font-medium text-foreground mb-10">Certificates</h2>
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
                        onClick={() => openModal(cert)}
                        className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                        style={{ gridArea: `t${i}` }}
                    >
                        <Image
                            src={getThumbnail(cert)}
                            alt={`Certificate ${cert.id}`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>

            {mounted && createPortal(modalContent, document.body)}
        </section>
    );
}