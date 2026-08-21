export default async function AdminPage({params}: {params:{ id: string }}) {
    const { id } = await params;    
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500">Admin ID: {id}</p>
        </div>
      </main>
    );
}