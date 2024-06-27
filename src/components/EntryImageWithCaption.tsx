const EntryImageWithCaption = ({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) => (
  <div className="relative">
    <img
      src={src}
      alt={caption}
      className="aspect-video rounded-lg object-cover"
    />
    <div className="prose prose-sm absolute inset-0 flex flex-col justify-end p-4 text-xs leading-none opacity-50">
      <p>{caption}</p>
    </div>
  </div>
);

export default EntryImageWithCaption;
