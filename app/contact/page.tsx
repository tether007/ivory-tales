import PageCover from "@/components/sections/PageCover";
import ContactIntro from "@/components/sections/ContactIntro";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <PageCover src="/covers/contact.png" alt="Couple walking at sunset" />
      <ContactIntro />
      <div className="bg-[#f3eeec] px-4 pb-16 md:pb-24">
        <ContactForm />
      </div>
    </main>
  );
}