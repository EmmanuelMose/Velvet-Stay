import { useState } from "react";
import {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentsByDateQuery,
} from "../../../Features/payment/paymentAPI";

interface Payment {
  paymentId: number;
  bookingId: number;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  data: T;
}

const Payment = () => {
  const [searchId, setSearchId] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "byId" | "byDate">("all");

  const {
    data: allPayments,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetAllPaymentsQuery(undefined, {
    skip: activeFilter !== "all",
  }) as { data?: ApiResponse<Payment[]>; isLoading: boolean; isError: boolean };

  const {
    data: paymentById,
    isLoading: isIdLoading,
    isError: isIdError,
  } = useGetPaymentByIdQuery(Number(searchId), {
    skip: activeFilter !== "byId" || !searchId,
  }) as { data?: ApiResponse<Payment>; isLoading: boolean; isError: boolean };

  const {
    data: paymentsByDate,
    isLoading: isDateLoading,
    isError: isDateError,
  } = useGetPaymentsByDateQuery(searchDate, {
    skip: activeFilter !== "byDate" || !searchDate,
  }) as { data?: ApiResponse<Payment[]>; isLoading: boolean; isError: boolean };

  const renderTable = (payments: Payment[]) => {
    if (!Array.isArray(payments)) return <p>No valid payments to display</p>;

    return (
      <div className="overflow-x-auto border border-blue-200 bg-white shadow rounded-lg mt-4">
        <table className="table w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Payment ID</th>
              <th className="p-2">Booking ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Method</th>
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Payment Date</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId} className="hover:bg-blue-50">
                <td className="p-2">{payment.paymentId}</td>
                <td className="p-2">{payment.bookingId}</td>
                <td className="p-2 font-semibold text-green-700">KES {payment.amount}</td>
                <td className="p-2 capitalize">{payment.paymentStatus}</td>
                <td className="p-2">{payment.paymentMethod}</td>
                <td className="p-2">{payment.transactionId}</td>
                <td className="p-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="p-2">{new Date(payment.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-2 h-[calc(100vh-80px)] overflow-y-auto">
      {/* Search Filters */}
      <div className="bg-white p-4 rounded shadow mb-4 border border-blue-300">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search by ID */}
          <div className="flex gap-2 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 px-3 py-1 text-sm rounded border border-gray-300 text-black"
            />
            <button
              onClick={() => setActiveFilter("byId")}
              disabled={!searchId}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              Search
            </button>
          </div>

          {/* Search by Date */}
          <div className="flex gap-2 w-full md:w-1/2">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="flex-1 px-3 py-1 text-sm rounded border border-gray-300 text-black"
            />
            <button
              onClick={() => setActiveFilter("byDate")}
              disabled={!searchDate}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* View All */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setActiveFilter("all")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            View All
          </button>
        </div>
      </div>

      {/* Display Payments */}
      <div>
        {activeFilter === "all" && (
          <>
            {isAllLoading && <p className="text-center">Loading all payments...</p>}
            {isAllError && <p className="text-center text-red-500">Error loading payments.</p>}
            {allPayments?.data && renderTable(allPayments.data)}
          </>
        )}

        {activeFilter === "byId" && (
          <>
            {isIdLoading && <p className="text-center">Loading payment by ID...</p>}
            {isIdError && <p className="text-center text-red-500">Error loading payment by ID.</p>}
            {paymentById?.data && renderTable([paymentById.data])}
          </>
        )}

        {activeFilter === "byDate" && (
          <>
            {isDateLoading && <p className="text-center">Loading payments by date...</p>}
            {isDateError && <p className="text-center text-red-500">Error loading payments by date.</p>}
            {paymentsByDate?.data && renderTable(paymentsByDate.data)}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
