interface PreviewPanelProps {
  content: string;
}

export function DialogPublicationsPreview({ content }: PreviewPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Preview Area</h2>
      <p>{content || "Your content will appear here..."}</p>

      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Section {i + 1}</h3>
          <p>This is an example section to demonstrate scrolling behavior.</p>
        </div>
      ))}
    </div>
  );
}
