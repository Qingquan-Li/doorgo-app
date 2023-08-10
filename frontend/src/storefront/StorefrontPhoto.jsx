export default function StorefrontPhoto({ photo }) {
  return (
    <div className="relative">
      <div className="h-0 pb-[56.25%]">
        <img
          src={photo}
          alt="Storefront Photo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
