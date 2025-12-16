import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Configuration
const VERCEL_API_URL = 'https://api.vercel.com/v9/projects';
const VERCEL_DEPLOY_URL = 'https://api.vercel.com/v13/deployments';
const TOKEN = process.env.VERCEL_API_TOKEN;

// This would typically come from a DB or env
const TEMPLATE_REPO = "madjid-ouldgougam/portfolio-template"; // Example

export async function POST(req: Request) {
    // 1. Check Authentication
    const session = await getServerSession();
    /* 
    // Uncomment access control in production
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    */

    try {
        const body = await req.json();
        const { projectName, userData } = body; // userData would be injected into the build env

        if (!TOKEN) {
            return NextResponse.json({ error: 'Server misconfiguration: VERCEL_API_TOKEN missing' }, { status: 500 });
        }

        // 2. Create Project on Vercel
        console.log(`Creating Vercel project: ${projectName}...`);

        // Step A: Create the Project container
        const createProjectRes = await fetch(VERCEL_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: projectName,
                framework: 'nextjs',
                gitRepository: {
                    type: 'github',
                    repo: TEMPLATE_REPO,
                },
                buildCommand: "npm run build", // Custom build command if needed
                environmentVariables: [
                    { key: "NEXT_PUBLIC_USER_DATA", value: JSON.stringify(userData), target: ["production"] }
                ]
            }),
        });

        if (!createProjectRes.ok) {
            const error = await createProjectRes.json();
            console.error("Vercel Create Error:", error);
            // If it already exists, we might want to just deploy to it, 
            // but for now let's return error or handle generically
            if (error.code !== 'forbidden') { // Example check
                // return NextResponse.json({ error: error.message }, { status: 400 });
            }
        }

        const projectData = await createProjectRes.json();
        console.log("Project created/found:", projectData.id);

        // 3. Trigger Deployment (if not auto-triggered by git connection)
        // NOTE: Connecting specific git repo usually triggers a deploy automatically on Vercel side.
        // If we wanted to FORCE a deploy or deploy 'files' directly, we would use the /deployments endpoint.

        // For this simulation/demo, we assume the Git connection triggers it, 
        // or we construct a response based on the project creation.

        // Let's pretend we wait for a "READY" state or verify URL.
        // In a real generic usage without waiting for async build:
        const deployUrl = `https://${projectName}.vercel.app`; // Default Vercel pattern

        return NextResponse.json({
            success: true,
            deploymentUrl: deployUrl,
            projectId: projectData.id,
            status: 'QUEUED' // The user dashboard will poll for status later
        });

    } catch (error: any) {
        console.error("Deploy API Error:", error);
        return NextResponse.json({ error: error.message || 'Deployment failed' }, { status: 500 });
    }
}
