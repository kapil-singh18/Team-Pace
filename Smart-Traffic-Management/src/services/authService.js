// User management and authentication
export const users = [
    {
        id: 1,
        username: "admin",
        password: "admin123", // In real app, this would be hashed
        role: "administrator",
        name: "Admin User",
        email: "admin@bhopaltraffic.gov.in",
        permissions: ["all"]
    },
    {
        id: 2,
        username: "operator1",
        password: "op123",
        role: "operator",
        name: "Traffic Operator 1",
        email: "operator1@bhopaltraffic.gov.in",
        permissions: ["dashboard", "signals", "alerts", "map"]
    },
    {
        id: 3,
        username: "analyst",
        password: "analyst123",
        role: "analyst",
        name: "Traffic Analyst",
        email: "analyst@bhopaltraffic.gov.in",
        permissions: ["dashboard", "analytics", "alerts"]
    }
];

export class AuthService {
    static currentUser = null;

    static login(username, password) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = { ...user };
            delete this.currentUser.password; // Don't store password
            localStorage.setItem('trafficUser', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }
        return { success: false, message: "Invalid credentials" };
    }

    static logout() {
        this.currentUser = null;
        localStorage.removeItem('trafficUser');
    }

    static getCurrentUser() {
        if (this.currentUser) return this.currentUser;

        const stored = localStorage.getItem('trafficUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            return this.currentUser;
        }
        return null;
    }

    static isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    static hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;
        return user.permissions.includes('all') || user.permissions.includes(permission);
    }
}