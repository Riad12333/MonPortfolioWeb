import { GoogleAccountChooser } from "@/components/auth/google-account-chooser";

export default function SignUpPage() {
    return (
        <div className="flex justify-center w-full">
            <GoogleAccountChooser mode="signup" />
        </div>
    );
}
