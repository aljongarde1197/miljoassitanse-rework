export default function Projects() {
  const images = [
    "/placeholder1.jpg",
    "/placeholder2.jpg",
    "/placeholder3.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Recent Projects</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((image, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
}
