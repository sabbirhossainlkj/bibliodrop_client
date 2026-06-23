import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;


  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    throw new Error(
      "Something went wrong while retrieving the payment status.",
    );
  }

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email || "your email";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <svg
              style={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h2 style={styles.heading}>Payment Successful!</h2>
          <p style={styles.subtext}>
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>

          <div style={styles.divider} />

          <div style={styles.infoBox}>
            <span style={styles.infoLabel}>CONFIRMATION EMAIL SENT TO</span>
            <p style={styles.infoEmail}>{customerEmail}</p>
          </div>

          <p style={styles.supportText}>
            Have questions? Contact us at{" "}
            <a href="mailto:orders@example.com" style={styles.link}>
              orders@example.com
            </a>
          </p>

          <div style={styles.buttonContainer}>
            <Link href="/" style={styles.button}>
              Go Back Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div style={styles.container}>
      <p style={{ color: "#666" }}>Verifying your payment status...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "85vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    padding: "40px 32px",
    borderRadius: "16px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f3f4f6",
    textAlign: "center",
  },
  iconContainer: {
    margin: "0 auto",
    display: "flex",
    height: "64px",
    width: "64px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#f0fdf4",
  },
  icon: {
    height: "36px",
    width: "36px",
    color: "#22c55e",
  },
  heading: {
    marginTop: "24px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  subtext: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  divider: {
    margin: "24px 0",
    borderTop: "1px solid #f3f4f6",
  },
  infoBox: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "12px",
    textAlign: "left",
  },
  infoLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#9ca3af",
    letterSpacing: "0.5px",
  },
  infoEmail: {
    marginTop: "4px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    wordBreak: "break-all",
  },
  supportText: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#6b7280",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "underline",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: "32px",
  },
  button: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#111827",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "background-color 0.2s",
  },
};
