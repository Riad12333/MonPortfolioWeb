import { Document, Page, Text, View, StyleSheet, Image, Font, renderToStream } from '@react-pdf/renderer'

// Define styles (Dark Theme DGT match)
// Register a font if we want custom fonts, but using standard Helvetica/Times for now to be safe/fast
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#0f172a', // slate-950
        color: '#e2e8f0', // slate-200
        padding: 40,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Helvetica',
    },
    header: {
        width: '40%',
        paddingRight: 20,
        borderRightWidth: 1,
        borderRightColor: '#475569', // slate-600
        display: 'flex',
        flexDirection: 'column',
    },
    // Left Sidebar Elements
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf: 'center',
        objectFit: 'cover',
        backgroundColor: '#cbd5e1'
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#f8fafc', // slate-50
    },
    title: {
        fontSize: 16,
        color: '#06b6d4', // cyan-500
        marginBottom: 12,
        fontWeight: 'medium',
    },
    contactSection: {
        marginTop: 20,
        marginBottom: 20,
    },
    contactItem: {
        fontSize: 10,
        marginBottom: 6,
        color: '#94a3b8', // slate-400
    },

    // Sidebar Section
    sidebar: {
        marginTop: 20,
    },
    sectionTitleSidebar: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
        color: '#3b82f6', // blue-500
    },
    skillItem: {
        fontSize: 11,
        marginBottom: 4,
        color: '#cbd5e1',
    },

    // Main Content
    main: {
        width: '60%',
        marginLeft: 20, // Adjusted for spacing
        paddingLeft: 20, // Add padding if needed, or rely on margin
    },
    section: {
        marginBottom: 24,
    },
    sectionTitleMain: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#3b82f6', // blue-500
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Experience
    expItem: {
        marginBottom: 16,
    },
    expTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f1f5f9',
    },
    expCompany: {
        fontSize: 12,
        color: '#38bdf8', // sky-400
        marginBottom: 4,
        fontStyle: 'italic',
    },
    expDesc: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#cbd5e1',
    },

    // Projects
    projectItem: {
        marginBottom: 12,
        backgroundColor: '#1e293b',
        padding: 10,
        borderRadius: 6,
    },
    projectName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f472b6',
        marginBottom: 2,
    },
    projectUrl: {
        fontSize: 9,
        color: '#38bdf8',
        marginBottom: 4,
    },

    // Education
    eduItem: {
        marginBottom: 10,
    },
    eduSchool: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#cbd5e1',
    },
    eduDegree: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#a78bfa',
    },
});

// Helper to resolve image path
import path from 'path';
import fs from 'fs';

const getProfileImage = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    // If local path starting with /, resolve to file system
    if (imagePath.startsWith('/')) {
        const localPath = path.join(process.cwd(), 'public', imagePath);
        if (fs.existsSync(localPath)) {
            try {
                return fs.readFileSync(localPath);
            } catch (e) {
                console.error("Error reading image file:", e);
                return null;
            }
        }
    }
    return null;
}

export async function generateCV(profile: any): Promise<NodeJS.ReadableStream> {
    const profileImageSrc = getProfileImage(profile.image);

    const CVDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* --- HEADER (Left Column) --- */}
                <View style={styles.header}>
                    {/* Image or Initials Placeholder */}
                    {profileImageSrc ? (
                        <Image src={profileImageSrc} style={styles.profileImage} />
                    ) : null}

                    <Text style={styles.name}>{profile.fullName}</Text>
                    <Text style={styles.title}>{profile.specialization || "Professional"}</Text>

                    <View style={styles.contactSection}>
                        {profile.email && <Text style={styles.contactItem}>{profile.email}</Text>}
                        {profile.phone && <Text style={styles.contactItem}>{profile.phone}</Text>}
                        {profile.portfolioUrl && <Text style={styles.contactItem}>{profile.portfolioUrl}</Text>}
                        {profile.socials?.linkedin && <Text style={styles.contactItem}>LinkedIn: {profile.socials.linkedin}</Text>}
                    </View>

                    {/* SIDEBAR SKILLS */}
                    <View style={styles.sidebar}>
                        <Text style={styles.sectionTitleSidebar}>Skills</Text>
                        {profile.skills?.map((skill: string, i: number) => (
                            <Text key={i} style={styles.skillItem}>{skill}</Text>
                        ))}
                    </View>
                </View>

                {/* --- MAIN CONTENT (Right Column) --- */}
                <View style={styles.main}>

                    {/* EXPERIENCE */}
                    {profile.experience?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleMain}>Experience</Text>
                            {profile.experience.map((exp: any, i: number) => (
                                <View key={i} style={styles.expItem}>
                                    <Text style={styles.expTitle}>{exp.role}</Text>
                                    <Text style={styles.expCompany}>{exp.company} | {exp.duration}</Text>
                                    <Text style={styles.expDesc}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* PROJECTS */}
                    {profile.projects?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleMain}>Projects</Text>
                            {profile.projects.map((proj: any, i: number) => (
                                <View key={i} style={styles.projectItem}>
                                    <Text style={styles.projectName}>{proj.title}</Text>
                                    <Text style={styles.projectUrl}>{proj.link}</Text>
                                    <Text style={styles.expDesc}>{proj.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* EDUCATION */}
                    {profile.education?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleMain}>Education</Text>
                            {profile.education.map((edu: any, i: number) => (
                                <View key={i} style={styles.eduItem}>
                                    <Text style={styles.eduSchool}>{edu.institution}</Text>
                                    <Text style={styles.eduDegree}>{edu.degree} | {edu.year}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </View>
            </Page>
        </Document>
    );

    // Render to stream
    return await renderToStream(CVDocument);
}
