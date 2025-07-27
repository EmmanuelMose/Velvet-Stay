// src/components/admin/AnalyticsDashboard.tsx
import { useGetAllUsersQuery } from "../../../Features/users/usersAPI";
import { useGetHotelsQuery } from "../../../Features/hotels/hotelAPI";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  const { data: users = [] } = useGetAllUsersQuery();
  const { data: hotels = [] } = useGetHotelsQuery();

  const userRoleData = useMemo(() => {
    const roleCount = { User: 0, Admin: 0 };
    users.forEach((u) => roleCount[u.role]++);
    return Object.entries(roleCount).map(([name, value]) => ({ name, value }));
  }, [users]);

  const verifiedData = useMemo(() => {
    const verified = users.filter((u) => u.isVerified).length;
    return [
      { name: "Verified", value: verified },
      { name: "Unverified", value: users.length - verified },
    ];
  }, [users]);

  const hotelsByLocation = useMemo(() => {
    const locationMap: Record<string, number> = {};
    hotels.forEach((h) => {
      locationMap[h.location] = (locationMap[h.location] || 0) + 1;
    });
    return Object.entries(locationMap).map(([name, value]) => ({ name, value }));
  }, [hotels]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{users.length}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Verified Users</p>
          <h2 className="text-2xl font-bold">
            {users.filter((u) => u.isVerified).length}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Total Hotels</p>
          <h2 className="text-2xl font-bold">{hotels.length}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Locations</p>
          <h2 className="text-2xl font-bold">{hotelsByLocation.length}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="shadow-lg p-4 rounded-xl bg-white">
          <h3 className="font-bold text-lg mb-2">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
              >
                {userRoleData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-lg p-4 rounded-xl bg-white">
          <h3 className="font-bold text-lg mb-2">Verified vs Unverified Users</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={verifiedData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
              >
                {verifiedData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-lg p-4 rounded-xl bg-white">
          <h3 className="font-bold text-lg mb-2">Hotels by Location</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hotelsByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
