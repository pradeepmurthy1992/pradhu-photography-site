import React from "react";
import { CONTAINER } from "@/app/config";

export default function Footer({ T, email = "pradhuphotography@gmail.com", phone = "+91 93225 84410", city = "Pune" }) {
  return (
    <footer className={`border-t ${T.footerBorder} ${T.footerBg}`}>
      <div className={`${CONTAINER} py-10 text-sm`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className={T.muted}>© {new Date().getFullYear()} PRADHU — All rights reserved.</p>
          <p className={T.muted}>{city} · {email} · {phone}</p>
        </div>
      </div>
    </footer>
  );
}
