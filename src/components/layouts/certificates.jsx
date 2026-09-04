import Image from "next/image";

const certificates = [
    { id: 1, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 2, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 3, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 4, src: "/assets/heroimg1.jpg", orientation: "portrait" }, // sertifikat BNSP misalnya
    { id: 5, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 6, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 7, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 8, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 9, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    { id: 10, src: "/assets/heroimg1.jpg", orientation: "landscape" },
    // ... tinggal tambah sampai 20, isi "portrait" cuma di 1 item aja
];

// Span berdasarkan orientasi asli sertifikat, bukan random
const getSpan = (orientation) => {
    if (orientation === "portrait") {
        return { col: 1, row: 2 }; // tinggi 2 baris, sempit
    }
    return { col: 2, row: 1 }; // lebar 2 kolom, pendek — landscape
};

export default function Certificates() {
    return (
        <section className="pb-28 mx-auto w-full overflow-auto">
            <h2 className="text-xl font-medium text-foreground mb-8">
                Certificates
            </h2>
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gridAutoRows: "200px",
                    gridAutoFlow: "dense",
                }}
            >
                {certificates.map((cert) => {
                    const span = getSpan(cert.orientation);
                    return (
                        <div
                            key={cert.id}
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                gridColumn: `span ${span.col}`,
                                gridRow: `span ${span.row}`,
                            }}
                        >
                            <Image
                                src={cert.src}
                                alt={`Certificate ${cert.id}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}