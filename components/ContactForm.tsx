export type ContactFormProps = {
  onSubmit?: (data: FormData) => void | Promise<void>;
};

export default function ContactForm(_props: ContactFormProps) {
  return <form />;
}
