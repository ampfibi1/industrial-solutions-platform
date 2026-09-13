import DeleteButton from "@/components/admin/DeleteButton";

type Admin = {
  id: number;
  name: string;
  email: string;
};

type Company = {
  id: number;
  name: string;
};

type Oversight = {
  id: number;
  admin: Admin;
  company: Company;
};

type Props = {
  oversights: Oversight[];
};

export default function OversightTable({oversights}: Props) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Assigned Admins
      </h2>

      {oversights.length === 0 ? (
        <p className="text-gray-500">
          No admin has been assigned to this company.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="table">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Email</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {oversights.map((oversight) => (
                <tr key={oversight.id}>
                  <td>{oversight.admin.name}</td>

                  <td>{oversight.admin.email}</td>

                  <td>{oversight.company.name}</td>

                  <td>
                    <DeleteButton
                      id={oversight.id}
                      url={`http://localhost:3000/admin/oversight/${oversight.id}`}
                      name="Oversight"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}