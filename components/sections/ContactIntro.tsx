import Image from "next/image";

// Edit your details here. The phone number is a placeholder.
const contact = {
  email: "ivorytalesevents@gmail.com",
  phone: "+91 90196 56300",
  addressLines: ["Sahakar Nagar", "Bengaluru, Karnataka, India"],
};

export default function ContactIntro() {
  return (
    <section className="bg-[#f3eeec] px-6 py-16 text-center md:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        {/* Logo mark (brightness-0 makes it solid black on the light background) */}
        <Image
          src="/logo.svg"
          alt="Ivory Tales"
          width={80}
          height={80}
          className="h-12 w-auto brightness-0"
        />

        <h2 className="mt-8 font-serif text-3xl font-light text-[#c8b6a2] md:text-4xl">
          We can&rsquo;t wait to hear from you!
        </h2>
        <p className="mt-4 font-serif text-xl font-light text-[#c8b6a2] md:text-2xl">
          We are currently accepting clients for full-service planning.
        </p>

        {/* Short divider */}
        <span className="my-12 block h-px w-[60px] bg-neutral-500" aria-hidden />

        {/* Details */}
        <address className="text-sm not-italic leading-8 text-black">
          <p>
            <a href={`mailto:${contact.email}`} className="hover:underline underline-offset-4">
              {contact.email}
            </a>{" "}
            /{" "}
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="hover:underline underline-offset-4"
            >
              {contact.phone}
            </a>
          </p>
          {contact.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </div>
    </section>
  );
}
