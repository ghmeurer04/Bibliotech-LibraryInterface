interface Props{
    tableContent: any[];
    page?: number;
    canPrevious?: boolean;
    canNext?: boolean;
    onPrevious?: () => void | Promise<void>;
    onNext?: () => void | Promise<void>;
}

function Table({
    tableContent,
    page = 0,
    canPrevious = false,
    canNext = false,
    onPrevious = () => {},
    onNext = () => {},
}: Props) {
    const columns = Object.keys(tableContent[0] || {});
    const colSpan = Math.max(columns.length, 1);

    return (
        <section className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-2xl shadow-emerald-950/30">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-heading">
                        <thead className="sticky top-0 z-10 bg-gradient-to-r from-emerald-300/15 via-white/5 to-transparent text-[11px] uppercase tracking-[0.2em] text-heading/70">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col} className="px-6 py-4 font-semibold">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {tableContent.length === 0 ? (
                                <tr>
                                    <td colSpan={colSpan} className="px-6 py-8 text-center text-heading/60">
                                        Nothing to show.
                                    </td>
                                </tr>
                            ) : (
                                tableContent.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="transition hover:bg-white/5 even:bg-white/[0.02]"
                                    >
                                        {Object.values(row).map((col, colIndex) => (
                                            <td key={colIndex} className="px-6 py-4">
                                                {String(col) || "—"}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={onPrevious}
                    disabled={!canPrevious}
                    className="rounded-full border border-emerald-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>
                <span className="text-xs uppercase tracking-[0.15em] text-heading/60">
                    Page {page + 1}
                </span>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canNext}
                    className="rounded-full border border-emerald-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default Table;
