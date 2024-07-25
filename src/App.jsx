import { useEffect, useState } from "react";

function App() {
    const [inputValue, setInputValue] = useState({
        totalCost: 0,
        interestRate: 0,
        processingFee: 0,
        downPayment: 0,
        loanAmount: 0,
        tenure: 12,
    });
    const [downPayment, setDownPayment] = useState({
        amount: 0,
        totalAmount: 0,
    });
    const [loanDetails, SetLoanDetails] = useState({
        totalLoanAmount: 0,
        loanAmountPerMonth: 0,
    });

    useEffect(() => {
        console.log("input value", inputValue);
        calculateDownPaymentAmount();
        calculateLoanAmount();
    }, [inputValue]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleTenure = (value) => {
        setInputValue((prev) => ({
            ...prev,
            tenure: Number(value),
        }));
    };

    const calculateDownPaymentAmount = () => {
        const {
            totalCost,
            processingFee,
            downPayment: downPaymentPerc,
        } = inputValue;
        const downPaymentAmount = Math.round(
            (totalCost * downPaymentPerc) / 100
        );
        const totalDownPaymentAmount = Math.round(
            downPaymentAmount +
                ((totalCost - downPaymentAmount) * processingFee) / 100
        );
        setDownPayment({
            amount: downPaymentAmount,
            totalAmount: totalDownPaymentAmount,
        });
    };

    const calculateLoanAmount = () => {
        const { totalCost, interestRate, tenure } = inputValue;
        const P = totalCost - downPayment.amount;
        const R = interestRate;
        const N = Math.round(tenure / 12);
        if (R !== 0) {
            const EMI = Math.round((P * R * (1 + R) ** N) / ((1 + R) ** N - 1));
            SetLoanDetails({
                totalLoanAmount: P,
                loanAmountPerMonth: EMI,
            });
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-2/3 h-auto">
                <div className="text-4xl font-bold">EMI Calculator</div>
                <div className="m-6">
                    <label className="block font-semibold" htmlFor="totalCost">
                        Total Cost of Asset
                    </label>
                    <input
                        type="number"
                        id="totalCost"
                        name="totalCost"
                        value={inputValue.totalCost}
                        onChange={handleChange}
                        className="block border-b-2 border-gray-600 focus:outline-none focus:border-b-4 w-full p-2"
                    />
                </div>
                <div className="m-6">
                    <label
                        className="block font-semibold"
                        htmlFor="interestRate"
                    >
                        Interest Rate(in %)
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        name="interestRate"
                        id="interestRate"
                        value={inputValue.interestRate}
                        onChange={handleChange}
                        className="block border-b-2 border-gray-600 focus:outline-none focus:border-b-4 w-full p-2"
                    />
                </div>
                <div className="m-6">
                    <label
                        className="block font-semibold"
                        htmlFor="processingFee"
                    >
                        Processing Fee(in %)
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        name="processingFee"
                        id="processingFee"
                        value={inputValue.processingFee}
                        onChange={handleChange}
                        className="block border-b-2 border-gray-600 focus:outline-none focus:border-b-4 w-full p-2"
                    />
                </div>
                <div className="m-6">
                    <label
                        className="block font-semibold"
                        htmlFor="downPayment"
                    >
                        Down Payment(in %)
                    </label>
                    <div className="my-2">
                        Total Down Payment - ₹ {downPayment.totalAmount}
                    </div>
                    <input
                        id="downPayment"
                        type="range"
                        name="downPayment"
                        min={0}
                        max={100}
                        value={inputValue.downPayment}
                        onChange={handleChange}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center my-2">
                        <div>0%</div>
                        <div>₹ {downPayment.amount}</div>
                        <div>100%</div>
                    </div>
                </div>
                <div className="m-6">
                    <label className="block font-semibold" htmlFor="loanAmount">
                        Loan per Month
                    </label>
                    <div className="my-2">
                        Total Loan Amount - ₹ {loanDetails.totalLoanAmount}
                    </div>
                    <input
                        type="range"
                        name="loanAmount"
                        id="loanAmount"
                        value={inputValue.loanAmount}
                        onChange={handleChange}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center my-2">
                        <div>0%</div>
                        <div>₹ {loanDetails.loanAmountPerMonth}</div>
                        <div>100%</div>
                    </div>
                </div>
                <div className="m-6">
                    <div className="block font-semibold">tenure</div>
                    <div className="flex justify-between items-center mt-4">
                        <div
                            className={`w-32 h-16 border ${
                                inputValue.tenure === 12
                                    ? "bg-blue-400"
                                    : "bg-gray-300"
                            } rounded-full flex justify-center items-center`}
                            onClick={() => handleTenure(12)}
                        >
                            12
                        </div>
                        <div
                            className={`w-32 h-16 border ${
                                inputValue.tenure === 24
                                    ? "bg-blue-400"
                                    : "bg-gray-300"
                            } rounded-full flex justify-center items-center`}
                            onClick={() => handleTenure(24)}
                        >
                            24
                        </div>
                        <div
                            className={`w-32 h-16 border ${
                                inputValue.tenure === 36
                                    ? "bg-blue-400"
                                    : "bg-gray-300"
                            } rounded-full flex justify-center items-center`}
                            onClick={() => handleTenure(36)}
                        >
                            36
                        </div>
                        <div
                            className={`w-32 h-16 border ${
                                inputValue.tenure === 48
                                    ? "bg-blue-400"
                                    : "bg-gray-300"
                            } rounded-full flex justify-center items-center`}
                            onClick={() => handleTenure(48)}
                        >
                            48
                        </div>
                        <div
                            className={`w-32 h-16 border ${
                                inputValue.tenure === 60
                                    ? "bg-blue-400"
                                    : "bg-gray-300"
                            } rounded-full flex justify-center items-center`}
                            onClick={() => handleTenure(60)}
                        >
                            60
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
