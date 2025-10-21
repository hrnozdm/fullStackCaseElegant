import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-4">
      <div className="flex gap-6">
        <h1 className="text-4xl font-bold">Hasta Takip Sistemi</h1>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-gray-600">
            Hasta takip sistemine hoşgeldiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
