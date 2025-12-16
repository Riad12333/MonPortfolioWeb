import { GoogleAccountChooser } from "@/components/auth/google-account-chooser";

export default function SignInPage() {
    return (
        <div className="flex justify-center w-full">
            <GoogleAccountChooser mode="signin" />
        </div>
    );
}
