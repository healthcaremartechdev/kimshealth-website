import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";



const emailData = {
  generic: {
    "Book Appointment": ["appointments@kimskerala.com", "appointments@kimsglobal.com"],
    "Bookhealth Checkup": ["kimstech@webenza.com"],
    "Career": ["jobs@kimshealth.org"],
    "Contact": ["relations@kimskerala.com"],
    "KISA": ["paramedical@kimskerala.com"],
    "IMT": ["imt@kimshealth.org"],
    "Emergency Medicine Programme": ["socomer@kimsglobal.com"],
    "American Heart Association": ["socomer@kimsglobal.com"],
    "Doctoral courses": ["academics.tvm@kimsglobal.com"],
    "Nusring Recruitment": ["nursing.secretary@kimsglobal.com"],
    "Paramedical courses": ["paramedical@kimskerala.com"],
    "KIMSHEALTH Clinical Skills and Simulation Centre": ["socomer@kimsglobal.com"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  trivandrum: {
    "Book Appointment": ["appointments@kimskerala.com", "appointments@kimsglobal.com"],
    "Career": ["jobs@kimshealth.org"],
    "Contact": ["relations@kimskerala.com"],
    "Health At Home Services": ["healthathome.tvm@kimsglobal.com"],
    "KISA": ["kisa.tvm@kimshealth.org"],
    "IMT": ["imt@kimshealth.org"],
    "(IMT) Foundation Programme": ["imt@kimshealth.org"],
    "Emergency Medicine Programme": ["academics.tvm@kimshealth.org"],
    "American Heart Association": ["socomer@kimsglobal.com"],
    "Doctoral courses": ["academics.tvm@kimsglobal.com"],
    "Nusring Recruitment": ["nursing.secretary@kimsglobal.com"],
    "Paramedical courses": ["paramedical@kimskerala.com"],
    "KIMSHEALTH Clinical Skills and Simulation Centre": ["socomer@kimsglobal.com"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  kollam: {
    "Book Appointment": ["gpr.klm@kimshealth.org"],
    "Bookhealth Checkup": ["gpr.klm@kimshealth.org"],
    "Career": ["shiraz.n@kimsglobal.com"],
    "Contact": ["kimskollam@kimshealth.org"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  kottayam: {
    "Book Appointment": ["gpr.ktm@kimsglobal.com"],
    "Bookhealth Checkup": ["kims.ktm@kimshealth.org"],
    "Career": ["hr.ktm@kimsglobal.com"],
    "Contact": ["kims.ktm@kimshealth.org"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  alshifa: {
    "Book Appointment": ["health.checkup@kimsalshifa.com"],
    "Bookhealth Checkup": ["health.checkup@kimsalshifa.com"],
    "Career": ["hrd@kimsalshifa.com"],
    "Contact": ["shakkir.pt@kimsalshifa.com"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  nagercoil: {
    "Book Appointment": ["appointments.ngl@kimsglobal.com"],
    "Bookhealth Checkup": ["appointments.ngl@kimsglobal.com"],
    "Career": ["hr.ngl@kimshealth.org"],
    "Contact": ["relations.ngl@kimshealth.org"],
    "International": ["ipr.tvm@kimshealth.org"]
  },
  ip: {
    "Book Appointment": ["ipr.tvm@kimshealth.org"],
    "Bookhealth Checkup": ["ipr.tvm@kimshealth.org"],
    "Career": ["jobs@kimshealth.org"],
    "Contact": ["ipr.tvm@kimshealth.org"],
    "International": ["ipr.tvm@kimshealth.org"]
  }
};

const emailFrom = {
  generic: "KIMSHEALTH <donotreply@kimsglobal.com>",
  trivandrum: "KIMSHEALTH Trivandrum <donotreply@kimsglobal.com>",
  kollam: "KIMSHEALTH Kollam <donotreply@kimsglobal.com>",
  kottayam: "KIMSHEALTH Kottayam <donotreply@kimsglobal.com>",
  alshifa: "KIMSHEALTH Al-Shifa <donotreply@kimsglobal.com>",
  nagercoil: "KIMSHEALTH Nagercoil <donotreply@kimsglobal.com>",
  ip: "KIMSHEALTH International Patient <donotreply@kimsglobal.com>"
};

export async function POST(req) {
  const cookieStore = await cookies();
  const getLoc = JSON.parse(cookieStore.get("systemLocation")?.value);
  const loc = getLoc.slug;

  try {
    const { data, formType, sub, attachment, filename } = await req.json();

    if (!data || !loc || !formType) {
      return res.json({ err: "Fill the required fields" }, { status: 400 });
    }


    const recipients = emailData?.[loc]?.[formType];
    if (!recipients || recipients.length === 0) {
      return res.json({ err: "No email mapping found" }, { status: 404 });
    }


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    const mailOptions = {
      from: emailFrom[loc],
      // to: recipients.join(","),
      to: "sbhadipchanda@gmail.com",
      subject: !sub ? `${formType}` : `${formType} : ${sub}`,
      html: data,
    };


    // only add attachments if available
    if (attachment && filename) {
      mailOptions.attachments = [
        {
          filename: filename,
          content: attachment.split("base64,")[1],
          encoding: "base64"
        }
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    return res.json({ success: true, id: info.messageId, loc: loc }, { status: 200 });

  } catch (error) {
    console.error("Email send error:", error);
    return res.json({ err: "Something went wrong" }, { status: 500 });
  }
}
