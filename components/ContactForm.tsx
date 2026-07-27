"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.email("Informe um e-mail válido"),
  message: z.string().min(10, "Conte um pouco mais sobre o desafio")
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = ({ name, email, message }: FormData) => {
    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(`${message}\n\nDe: ${name}\nE-mail: ${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Nome
        <input placeholder="Como posso te chamar?" {...register("name")} />
        {errors.name && <small>{errors.name.message}</small>}
      </label>
      <label>
        E-mail
        <input type="email" placeholder="voce@empresa.com" {...register("email")} />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>
        Mensagem
        <textarea
          rows={4}
          placeholder="Conte sobre a oportunidade ou produto."
          {...register("message")}
        />
        {errors.message && <small>{errors.message.message}</small>}
      </label>
      <button className="button button-primary" type="submit">
        Enviar mensagem <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
