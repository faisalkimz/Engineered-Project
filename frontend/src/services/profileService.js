import api from '../api';

/**
 * 🇺🇬 User Profile API Services
 * Comprehensive profile management for TechMart Uganda
 */

// ============================================
// PROFILE APIs
// ============================================

export const profileService = {
    /**
     * Get detailed user profile
     */
    getProfile: async () => {
        const response = await api.get('/users/api/profile/');
        return response.data;
    },

    /**
     * Update user profile
     * @param {Object} data - Profile data to update
     */
    updateProfile: async (data) => {
        const response = await api.put('/users/api/profile/update/', data);
        return response.data;
    },

    /**
     * Upload user avatar
     * @param {File} file - Image file
     */
    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await api.post('/users/api/profile/avatar/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Delete user avatar
     */
    deleteAvatar: async () => {
        const response = await api.delete('/users/api/profile/avatar/delete/');
        return response.data;
    },

    /**
     * Get user statistics
     */
    getStats: async () => {
        const response = await api.get('/users/api/profile/stats/');
        return response.data;
    },
};

// ============================================
// ADDRESS APIs
// ============================================

export const addressService = {
    /**
     * Get all user addresses
     */
    getAddresses: async () => {
        const response = await api.get('/users/api/addresses/');
        return response.data;
    },

    /**
     * Create new address
     * @param {Object} addressData - Address details
     */
    createAddress: async (addressData) => {
        const response = await api.post('/users/api/addresses/', addressData);
        return response.data;
    },

    /**
     * Update address
     * @param {number} addressId - Address ID
     * @param {Object} addressData - Updated address data
     */
    updateAddress: async (addressId, addressData) => {
        const response = await api.patch(`/users/api/addresses/${addressId}/`, addressData);
        return response.data;
    },

    /**
     * Delete address
     * @param {number} addressId - Address ID
     */
    deleteAddress: async (addressId) => {
        const response = await api.delete(`/users/api/addresses/${addressId}/`);
        return response.data;
    },

    /**
     * Set address as default
     * @param {number} addressId - Address ID
     */
    setDefaultAddress: async (addressId) => {
        const response = await api.post(`/users/api/addresses/${addressId}/set-default/`);
        return response.data;
    },
};

// ============================================
// UGANDAN LOCALIZATION DATA
// ============================================

export const ugandaData = {
    /**
     * All Ugandan districts (alphabetically sorted)
     */
    districts: [
        "Abim", "Adjumani", "Agago", "Alebtong", "Amolatar", "Amudat", "Amuria", "Amuru",
        "Apac", "Arua", "Budaka", "Bududa", "Bugiri", "Bugweri", "Buhweju", "Buikwe",
        "Bukedea", "Bukimbiri", "Bukwo", "Bulambuli", "Buliisa", "Bundibugyo", "Bunyangabu",
        "Bushenyi", "Busia", "Butaleja", "Butambala", "Butebo", "Buvuma", "Buyende",
        "Gomba", "Gulu", "Hoima", "Ibanda", "Iganga", "Isingiro", "Jinja", "Kaabong",
        "Kabarole", "Kaberamaido", "Kabale", "Kagadi", "Kakumiro", "Kalaki", "Kalangala",
        "Kaliro", "Kalungu", "Kampala", "Kamuli", "Kamwenge", "Kanungu", "Kapchorwa",
        "Kapelebyong", "Kasanda", "Kasese", "Katakwi", "Kayunga", "Kazo", "Kibaale",
        "Kiboga", "Kibuku", "Kikuube", "Kiruhura", "Kiryandongo", "Kisoro", "Kitagwenda",
        "Kitgum", "Koboko", "Kole", "Kotido", "Kumi", "Kwania", "Kween", "Kyankwanzi",
        "Kyegegwa", "Kyenjojo", "Kyotera", "Lamwo", "Lira", "Luuka", "Luwero", "Lwengo",
        "Lyantonde", "Madi-Okollo", "Manafwa", "Maracha", "Masaka", "Masindi", "Mayuge",
        "Mbale", "Mbarara", "Mitooma", "Mityana", "Moroto", "Moyo", "Mpigi", "Mubende",
        "Mukono", "Nakapiripirit", "Nakaseke", "Nakasongola", "Namayingo", "Namisindwa",
        "Namutumba", "Napak", "Nebbi", "Ngora", "Ntoroko", "Ntungamo", "Nwoya", "Obongi",
        "Omoro", "Otuke", "Oyam", "Pader", "Pakwach", "Pallisa", "Rakai", "Rubanda",
        "Rubirizi", "Rukiga", "Rukungiri", "Rwampara", "Sembabule", "Serere", "Sheema",
        "Sironko", "Soroti", "Tororo", "Wakiso", "Yumbe", "Zombo"
    ],

    /**
     * Major cities for delivery
     */
    majorCities: [
        "Kampala", "Wakiso", "Entebbe", "Jinja", "Mbale", "Gulu", "Lira", "Mbarara",
        "Fort Portal", "Kasese", "Masaka", "Arua", "Soroti", "Kabale", "Hoima",
        "Tororo", "Mukono", "Mityana", "Masindi", "Iganga"
    ],

    /**
     * Mobile money providers
     */
    mobileMoneyProviders: [
        { id: 'mtn', name: 'MTN Mobile Money', code: 'MTN', prefixes: ['077', '078'] },
        { id: 'airtel', name: 'Airtel Money', code: 'AIRTEL', prefixes: ['070', '075'] },
    ],

    /**
     * Common pickup locations in Kampala
     */
    pickupLocations: [
        "Taxi Park (Old)", "New Taxi Park", "Nakawa Market", "Owino Market",
        "Nakasero Market", "Kikuubo", "Wandegeya Market", "Ntinda Shopping Center",
        "Garden City", "Acacia Mall", "Lugogo Mall", "Freedom City"
    ],

    /**
     * Format price in UGX
     * @param {number} amount - Price amount
     * @returns {string} Formatted price
     */
    formatPrice: (amount) => {
        return `UGX ${amount.toLocaleString('en-UG', { maximumFractionDigits: 0 })}`;
    },

    /**
     * Format phone number for Uganda
     * @param {string} phone - Phone number
     * @returns {string} Formatted phone
     */
    formatPhone: (phone) => {
        // Remove any existing formatting
        const cleaned = phone.replace(/\D/g, '');

        // Format as +256-XXX-XXXXXX
        if (cleaned.startsWith('256')) {
            const number = cleaned.substring(3);
            return `+256-${number.substring(0, 3)}-${number.substring(3)}`;
        } else if (cleaned.startsWith('0')) {
            const number = cleaned.substring(1);
            return `+256-${number.substring(0, 3)}-${number.substring(3)}`;
        }

        return phone;
    },

    /**
     * Validate Ugandan phone number
     * @param {string} phone - Phone number
     * @returns {boolean} Is valid
     */
    validatePhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const pattern = /^(256|0)?[7][0-9]{8}$/;
        return pattern.test(cleaned);
    },
};

// ============================================
// EXPORT ALL SERVICES
// ============================================

export default {
    profile: profileService,
    address: addressService,
    uganda: ugandaData,
};
