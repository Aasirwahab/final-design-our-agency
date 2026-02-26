import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060606]">
            <SignIn
                routing="hash"
                afterSignInUrl="/admin"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-[#0a0a0a] border border-white/[0.06] shadow-2xl",
                        headerTitle: "text-white",
                        headerSubtitle: "text-white/50",
                        socialButtonsBlockButton:
                            "bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]",
                        formFieldLabel: "text-white/70",
                        formFieldInput:
                            "bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/30",
                        footerActionLink: "text-white/70 hover:text-white",
                        formButtonPrimary:
                            "bg-white text-black hover:bg-white/90",
                    },
                }}
            />
        </div>
    );
}
