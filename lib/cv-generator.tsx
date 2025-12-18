import { Document, Page, Text, View, StyleSheet, Image, Font, renderToStream } from '@react-pdf/renderer'
import path from 'path';
import fs from 'fs';

// Helper to resolve image path
const getProfileImage = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

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

// Define styles to match the provided screenshot
const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        color: '#1a1a1a',
    },
    // Header section
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    headerLeft: {
        flex: 1,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000000',
        marginBottom: 4,
    },
    specialization: {
        fontSize: 14,
        color: '#334155',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 12,
        letterSpacing: 1,
    },
    contactRow: {
        flexDirection: 'row',
        gap: 12,
        fontSize: 9,
        color: '#64748b',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    imagePlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },

    // Horizontal Line
    separator: {
        height: 1,
        backgroundColor: '#e2e8f0',
        width: '100%',
        marginBottom: 25,
    },

    // Section styling
    section: {
        marginBottom: 25,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitleBar: {
        width: 4,
        height: 18,
        backgroundColor: '#000000',
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000000',
        letterSpacing: 1,
    },

    // Content styles
    summaryText: {
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.6,
    },

    // Skills Badge layout
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
    },
    skillText: {
        fontSize: 9,
        color: '#475569',
        fontWeight: 'bold',
    },

    // Lists
    listItem: {
        marginBottom: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
    },
    itemSubtitle: {
        fontSize: 10,
        color: '#64748b',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    itemDesc: {
        fontSize: 9,
        color: '#475569',
        lineHeight: 1.5,
    }
});

export async function generateCV(profile: any): Promise<NodeJS.ReadableStream> {
    const profileImageSrc = getProfileImage(profile.image);

    const CVDocument = (
        <Document title={`CV - ${profile.fullName}`}>
            <Page size="A4" style={styles.page}>
                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{profile.fullName}</Text>
                        <Text style={styles.specialization}>{profile.specialization || "Developer"}</Text>
                        <View style={styles.contactRow}>
                            {profile.email && <Text>{profile.email}</Text>}
                            <Text>•</Text>
                            <Text>{profile.location || "Available Worldwide"}</Text>
                            <Text>•</Text>
                            <Text>{profile.username}.dgtportfolio.com</Text>
                        </View>
                    </View>
                    {profileImageSrc ? (
                        <Image src={profileImageSrc} style={styles.profileImage} />
                    ) : (
                        <View style={styles.imagePlaceholder} />
                    )}
                </View>

                <View style={styles.separator} />

                {/* --- SUMMARY --- */}
                {profile.about && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleBar} />
                            <Text style={styles.sectionTitle}>Professional Summary</Text>
                        </View>
                        <Text style={styles.summaryText}>{profile.about}</Text>
                    </View>
                )}

                {/* --- SERVICES --- */}
                {profile.services?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleBar} />
                            <Text style={styles.sectionTitle}>Services</Text>
                        </View>
                        <View style={styles.skillsContainer}>
                            {profile.services.map((service: any, i: number) => (
                                <View key={i} style={styles.skillBadge}>
                                    <Text style={styles.skillText}>{typeof service === 'string' ? service : service.title}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* --- SKILLS --- */}
                {profile.skills?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleBar} />
                            <Text style={styles.sectionTitle}>Skills</Text>
                        </View>
                        <View style={styles.skillsContainer}>
                            {profile.skills.map((skill: string, i: number) => (
                                <View key={i} style={styles.skillBadge}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* --- EXPERIENCE --- */}
                {profile.experience?.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleBar} />
                            <Text style={styles.sectionTitle}>Experience</Text>
                        </View>
                        {profile.experience.map((exp: any, i: number) => (
                            <View key={i} style={styles.listItem}>
                                <Text style={styles.itemTitle}>{exp.role}</Text>
                                <Text style={styles.itemSubtitle}>{exp.company} | {exp.duration}</Text>
                                <Text style={styles.itemDesc}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* --- EDUCATION & CERTIFICATES --- */}
                <View style={{ flexDirection: 'row', gap: 40 }}>
                    {profile.education?.length > 0 && (
                        <View style={{ flex: 1 }}>
                            <View style={styles.sectionTitleContainer}>
                                <View style={styles.sectionTitleBar} />
                                <Text style={styles.sectionTitle}>Education</Text>
                            </View>
                            {profile.education.map((edu: any, i: number) => (
                                <View key={i} style={styles.listItem}>
                                    <Text style={styles.itemTitle}>{edu.institution}</Text>
                                    <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {profile.certificates?.length > 0 && (
                        <View style={{ flex: 1 }}>
                            <View style={styles.sectionTitleContainer}>
                                <View style={styles.sectionTitleBar} />
                                <Text style={styles.sectionTitle}>Certificates</Text>
                            </View>
                            {profile.certificates.map((cert: any, i: number) => (
                                <View key={i} style={styles.listItem}>
                                    <Text style={styles.itemTitle}>{cert.name}</Text>
                                    <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

            </Page>
        </Document>
    );

    return await renderToStream(CVDocument);
}
