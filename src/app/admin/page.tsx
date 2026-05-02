"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Key, ShieldCheck, Loader2, Copy, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("CONSTRUCTION_WORKER");
  const [admin, setAdmin] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "ADMIN") {
      router.push("/login");
      return;
    }
    setAdmin(parsedUser);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, role: newRole }),
      });
      if (res.ok) {
        setNewName("");
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Admin Control</h1>
          <p className="text-slate-500">Managing staff access for IKNwild</p>
        </div>
        <div className="rounded-2xl bg-forest-green p-4 text-white">
          <ShieldCheck className="h-8 w-8" />
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Creation Form */}
        <section className="lg:col-span-1">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <UserPlus className="h-5 w-5 text-forest-green" />
              Generate Staff Code
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Full Name</label>
                <input
                  required
                  className="w-full rounded-xl border bg-slate-50 px-4 py-3 outline-none focus:border-forest-green focus:bg-white"
                  placeholder="e.g. John Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Role</label>
                <select
                  className="w-full rounded-xl border bg-slate-50 px-4 py-3 outline-none focus:border-forest-green focus:bg-white"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="CONSTRUCTION_WORKER">Construction Worker</option>
                  <option value="FOREST_RANGER">Forest Ranger</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isCreating}
                className="flex w-full items-center justify-center rounded-xl bg-forest-green py-3.5 font-bold text-white transition-all hover:bg-forest-green/90 disabled:opacity-70"
              >
                {isCreating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Generate Access Code"}
              </button>
            </form>
          </div>
        </section>

        {/* Staff List */}
        <section className="lg:col-span-2">
          <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-6 border-b">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Users className="h-5 w-5 text-slate-400" />
                Staff Directory
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Access Code</th>
                    <th className="px-6 py-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-slate-300" />
                      </td>
                    </tr>
                  ) : (
                    users.map((u: any) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{u.name}</td>
                        <td className="px-6 py-4">
                           <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                             u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                             u.role === 'FOREST_RANGER' ? 'bg-blue-100 text-blue-700' :
                             'bg-slate-100 text-slate-700'
                           }`}>
                             {u.role.replace('_', ' ')}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2 font-mono text-forest-green font-bold">
                             <Key className="h-3 w-3" />
                             {u.code}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
