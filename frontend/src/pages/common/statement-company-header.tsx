type Props = {
    selectedFromDate: string ,
    selectedToDate: string ,
}

const StatementCompanyHeader = ({ selectedToDate, selectedFromDate}: Props) => {
    return <>
        {/* Title and Period */}
        <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wide">
                Statement Of Account
            </h2>
            {selectedFromDate && selectedToDate && (
                <p className="text-gray-700 mt-1 font-medium">
                    <span className="font-semibold">Period:</span> {selectedFromDate}{" "}
                    <span className="font-semibold">To</span> {selectedToDate}
                </p>
            )}
        </div>

        {/* Top Header - Logo & Company Info in one line */}
        <div className="flex justify-between items-center border-b pb-4 mb-0">
            {/* Company Info */}
            <div className="text-left">
                <h1 className="text-xl font-bold">Jessden Ventures.</h1>
                <p className="text-gray-600 text-sm">Location: Dome Pillar 2</p>
                <p className="text-gray-600 text-sm">Email:
                    <a className={'text-blue-600 underline'} href="mailTo: info@jessden.com">info@jessden.com</a>
                </p>
                <p className="text-gray-600 text-sm">Phone:
                    <a className={'text-blue-600 underline'} href="tel:+233 50 006 1419">+233 50 006 1419</a>
                </p>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
                <img
                    style={{ width: "250px", textShadow: "0 0 3px black" }}
                    src="/logo-plain.png" // replace with your company logo path
                    alt="Company Logo"
                    className="h-40 object-contain"
                />
            </div>
        </div>
    </>
}

export default StatementCompanyHeader;