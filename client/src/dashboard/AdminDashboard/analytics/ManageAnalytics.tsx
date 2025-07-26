// src/pages/admin/ManageAnalytics.tsx
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  useGetAllBookingsQuery,
} from "../../../Features/bookings/bookingAPI";
import { useGetHotelsQuery } from "../../../Features/hotels/hotelAPI";
import { useGetRoomsQuery } from "../../../Features/rooms/roomAPI";
import { useGetAllPaymentsQuery } from "../../../Features/payment/paymentAPI";
import { Bed, Building, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

const ManageAnalytics = () => {
  const { data: bookings } = useGetAllBookingsQuery();
  const { data: payments } = useGetAllPaymentsQuery();
  const { data: hotels } = useGetHotelsQuery();
  const { data: rooms } = useGetRoomsQuery();

  const totalRevenue = useMemo(() => {
    if (!Array.isArray(payments)) return 0;
    return payments.reduce((sum, p) => sum + (p.amount ?? 0), 0);
  }, [payments]);

  const bookingTrends = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings?.forEach((b) => {
      const date = new Date(b.createdAt).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [bookings]);

  const bookingStatusDistribution = useMemo(() => {
    const statusCounts = { Confirmed: 0, Pending: 0, Cancelled: 0 };
    bookings?.forEach((b) => {
      statusCounts[b.bookingStatus]++;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [bookings]);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-7xl mx-auto space-y-4 text-black">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-center text-blue-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Manage Analytics
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{
          icon: <Building className="text-blue-600 w-5 h-5" />, label: "Hotels", value: hotels?.length ?? 0
        }, {
          icon: <Bed className="text-green-600 w-5 h-5" />, label: "Rooms", value: rooms?.length ?? 0
        }, {
          icon: <Calendar className="text-black w-5 h-5" />, label: "Bookings", value: bookings?.length ?? 0
        }, {
          icon: <DollarSign className="text-yellow-500 w-5 h-5" />, label: "Revenue", value: `Ksh ${totalRevenue.toLocaleString()}`
        }].map(({ icon, label, value }, i) => (
          <motion.div
            key={label}
            className="bg-gray-100 rounded-xl shadow-sm p-3 flex items-center justify-between"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {icon}
            <div className="text-right">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-base font-semibold">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="bg-gray-100 rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-md font-semibold text-blue-700 mb-2">Booking Trends</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={bookingTrends}>
              <XAxis dataKey="date" fontSize={10} tickLine={false} />
              <YAxis fontSize={10} tickLine={false} />
              <Tooltip />
              <Legend fontSize={10} />
              <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-gray-100 rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-md font-semibold text-green-700 mb-2">Booking Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={bookingStatusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {bookingStatusDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend fontSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageAnalytics;