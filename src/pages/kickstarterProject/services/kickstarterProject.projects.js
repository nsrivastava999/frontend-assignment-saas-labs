export const fetchProjects = async () => {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/master/frontend-assignment.json"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};
