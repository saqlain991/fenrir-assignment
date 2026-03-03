export const mockScans = [
    {
        id: "scan_1",
        name: "Web App Servers",
        type: "Greybox",
        status: "Completed",
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: "4d ago"
    },
    {
        id: "scan_2",
        name: "Web App Servers",
        type: "Greybox",
        status: "Completed",
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: "4d ago"
    },
    {
        id: "scan_3",
        name: "Web App Servers",
        type: "Greybox",
        status: "Completed",
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: "4d ago"
    },
    {
        id: "scan_4",
        name: "Web App Servers",
        type: "Greybox",
        status: "Completed",
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: "4d ago"
    },
    {
        id: "scan_5",
        name: "Web App Servers",
        type: "Greybox",
        status: "Completed",
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: "4d ago"
    },
    {
        id: "scan_6",
        name: "Web App Servers",
        type: "Greybox",
        status: "Scheduled",
        progress: 100, // Note: the design reference shows identical 100% teal bars for scheduled despite the status. Let's make it 0% for reality or match perfectly. The design actually shows the bar full teal for scheduled, I'll match it.
        vulnerabilities: { critical: null, high: 5, medium: 12, low: null },
        lastScan: "4d ago"
    },
    {
        id: "scan_7",
        name: "Web App Servers",
        type: "Greybox",
        status: "Scheduled",
        progress: 100,
        vulnerabilities: { critical: null, high: 5, medium: 12, low: null },
        lastScan: "4d ago"
    },
    {
        id: "scan_8",
        name: "IoT Devices",
        type: "Blackbox",
        status: "Failed",
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: "3d ago"
    },
    {
        id: "scan_9",
        name: "Temp Data",
        type: "Blackbox",
        status: "Failed",
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: "3d ago"
    }
];

export const mockLogs = [
    {
        id: "log_1",
        timestamp: "[09:00:00]",
        message: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
        highlightTags: ["helpdesk.democorp.com"]
    },
    {
        id: "log_2",
        timestamp: "[09:01:00]",
        message: "Good! target is online. Now let me perform port scanning to identify running services."
    },
    {
        id: "log_3",
        timestamp: "[09:02:00]",
        message: "Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.",
        highlightTags: ["helpdesk.democorp.com: Apache httpd 2.4.65", "port 80"]
    },
    {
        id: "log_4",
        timestamp: "[09:03:00]",
        message: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"TODO: Delete the testing account (test:test)\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.",
        highlightTags: ["TODO: Delete the testing account (test:test)", "/password/test"]
    },
    {
        id: "log_5",
        timestamp: "[09:04:00]",
        message: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.",
        highlightTags: ["POST", "/password/test", "'#'"]
    },
    {
        id: "log_6",
        timestamp: "[09:05:00]",
        message: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.",
        highlightTags: ["/password/test", "/api", "test:test"]
    },
    {
        id: "log_7",
        timestamp: "[09:06:00]",
        message: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
        highlightTags: ["'X-UserId: 10032'", "**IDOR vulnerability**"]
    }
];

export const mockFindings = [
    {
        id: "finding_1",
        severity: "Critical",
        timestamp: "10:45:23",
        title: "SQL Injection in Authentication Endpoint",
        endpoint: "/api/users/profile",
        description: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access."
    },
    {
        id: "finding_2",
        severity: "High",
        timestamp: "10:45:23",
        title: "Unauthorized Access to User Metadata",
        endpoint: "/api/auth/login",
        description: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing."
    },
    {
        id: "finding_3",
        severity: "Medium",
        timestamp: "10:45:23",
        title: "Broken Authentication Rate Limiting",
        endpoint: "/api/search",
        description: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible."
    }
];
