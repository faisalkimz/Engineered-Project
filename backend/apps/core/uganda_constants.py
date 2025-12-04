"""
🇺🇬 UGANDAN E-COMMERCE CONSTANTS
Contains all Uganda-specific data and configurations
"""

# ============================================
# UGANDAN DISTRICTS (All 136+ Districts)
# ============================================

UGANDAN_DISTRICTS = [
    # Central Region
    "Bugiri", "Buvuma", "Gomba", "Kalangala", "Kalungu", "Kampala",
    "Kayunga", "Kiboga", "Kyankwanzi", "Luweero", "Luwero", "Lwengo",
    "Lyantonde", "Masaka", "Mityana", "Mpigi", "Mubende", "Mukono",
    "Nakaseke", "Nakasongola", "Rakai", "Sembabule", "Wakiso",
    "Buikwe", "Butambala", "Buvuma", "Kassanda",
    
    # Eastern Region
    "Amuria", "Budaka", "Bududa", "Bugiri", "Bukedea", "Bukwa",
    "Bulambuli", "Busia", "Butaleja", "Buyende", "Iganga", "Jinja",
    "Kaberamaido", "Kaliro", "Kamuli", "Kapchorwa", "Katakwi",
    "Kibuku", "Kumi", "Kween", "Luuka", "Manafwa", "Mayuge",
    "Mbale", "Namayingo", "Namutumba", "Ngora", "Pallisa", "Serere",
    "Sironko", "Soroti", "Tororo", "Butebo", "Namisindwa", "Kalaki",
    "Kapelebyong", "Bugweri", "Namutumba", "Kibuku",
    
    # Northern Region
    "Abim", "Adjumani", "Agago", "Alebtong", "Amolatar", "Amudat",
    "Amuru", "Apac", "Arua", "Dokolo", "Gulu", "Kaabong", "Kitgum",
    "Koboko", "Kole", "Kotido", "Lamwo", "Lira", "Maracha", "Moroto",
    "Moyo", "Nakapiripirit", "Napak", "Nebbi", "Nwoya", "Otuke",
    "Oyam", "Pader", "Yumbe", "Zombo", "Alebtong", "Omoro",
    "Pakwach", "Lira", "Kwania", "Madi-Okollo", "Obongi", "Terego",
    
    # Western Region
    "Buhweju", "Buliisa", "Bundibugyo", "Bushenyi", "Hoima", "Ibanda",
    "Isingiro", "Kabale", "Kabarole", "Kamwenge", "Kanungu", "Kasese",
    "Kibaale", "Kiruhura", "Kiryandongo", "Kisoro", "Kyegegwa",
    "Kyenjojo", "Masindi", "Mbarara", "Mitooma", "Ntoroko", "Ntungamo",
    "Rubirizi", "Rukungiri", "Sheema", "Bunyangabu", "Kagadi", "Kakumiro",
    "Rubanda", "Rukiga", "Kitagwenda", "Rwampara", "Kikuube", "Kazo",
    "Rwampara", "Namisindwa", "Bukimbiri", "Buhweju",
]

# Sort districts alphabetically
UGANDAN_DISTRICTS = sorted(set(UGANDAN_DISTRICTS))

#========================

# MAJOR UGANDAN CITIES & TOWNS
# ============================================

MAJOR_CITIES = [
    "Kampala",
    "Wakiso",
    "Entebbe",
    "Jinja",
    "Mbale",
    "Gulu",
    "Lira",
    "Mbarara",
    "Fort Portal",
    "Kasese",
    "Masaka",
    "Arua",
    "Soroti",
    "Kabale",
    "Hoima",
    "Tororo",
    "Mukono",
    "Mityana",
    "Masindi",
    "Iganga",
]

# ============================================
# MOBILE MONEY PROVIDERS
# ============================================

MOBILE_MONEY_PROVIDERS = [
    {"id": "mtn", "name": "MTN Mobile Money", "code": "MTN", "logo": "mtn_logo.png"},
    {"id": "airtel", "name": "Airtel Money", "code": "AIRTEL", "logo": "airtel_logo.png"},
]

# ============================================
# PAYMENT METHODS
# ============================================

PAYMENT_METHODS = [
    {"id": "mobile_money", "name": "Mobile Money", "popular": True},
    {"id": "cash_on_delivery", "name": "Cash on Delivery", "popular": True},
    {"id": "bank_transfer", "name": "Bank Transfer", "popular": False},
    {"id": "credit_card", "name": "Credit/Debit Card", "popular": False},
]

# ============================================
# CURRENCY
# ============================================

CURRENCY = {
    "code": "UGX",
    "symbol": "UGX",
    "name": "Ugandan Shilling",
    "format": "UGX {:,.0f}",  # e.g., UGX 1,500,000
}

# ============================================
# DELIVERY ZONES & PRICING
# ============================================

DELIVERY_ZONES = {
    "kampala_central": {
        "name": "Kampala Central",
        "districts": ["Kampala"],
        "delivery_time": "Same day / Next day",
        "base_fee": 5000,  # UGX
    },
    "kampala_suburbs": {
        "name": "Kampala Metro (Wakiso, Mukono, Entebbe)",
        "districts": ["Wakiso", "Mukono", "Entebbe", "Buikwe"],
        "delivery_time": "1-2 days",
        "base_fee": 10000,
    },
    "major_cities": {
        "name": "Major Cities",
        "districts": MAJOR_CITIES,
        "delivery_time": "2-3 days",
        "base_fee": 15000,
    },
    "regional": {
        "name": "Regional Towns",
        "districts": [],  # All other districts
        "delivery_time": "3-5 days",
        "base_fee": 20000,
    },
    "rural": {
        "name": "Rural Areas",
        "districts": [],
        "delivery_time": "7-14 days",
        "base_fee": 30000,
    },
}

# ============================================
# TAX RATES
# ============================================

VAT_RATE = 0.18  # 18% VAT in Uganda

# ============================================
# UGANDAN NATIONAL COLORS
# ============================================

UGANDAN_COLORS = {
    "black": "#000000",
    "yellow": "#FCDC04",
    "red": "#D90000",
}

# ============================================
# LOCAL PICKUP POINTS
# ============================================

PICKUP_LOCATIONS = [
    "Taxi Park (Old)",
    "New Taxi Park",
    "Nakawa Market",
    "Owino Market (St. Balikuddembe)",
    "Nakasero Market",
    "Kikuubo",
    "Wandegeya Market",
    "Ntinda Shopping Center",
    "Garden City",
    "Acacia Mall",
    "Lugogo Mall",
    "Freedom City",
]

# ============================================
# POPULAR CATEGORIES FOR UGANDA
# ============================================

UGANDAN_POPULAR_CATEGORIES = [
    "Electronics",
    "Mobile Phones",
    "Fashion & Clothing",
    "Home Appliances",
    "Solar Panels & Inverters",  # Power solutions
    "Motorcycle Accessories",  # Boda boda parts
    "Agricultural Supplies",
    "School Supplies",
    "Beauty & Personal Care",
    "Food & Groceries",
    "Sports & Fitness",
    "Books & Stationery",
]

# ============================================
# UGANDAN PUBLIC HOLIDAYS (for sales events)
# ============================================

UGANDAN_HOLIDAYS = [
    {"date": "01-01", "name": "New Year's Day"},
    {"date": "01-26", "name": "NRM Liberation Day"},
    {"date": "03-08", "name": "International Women's Day"},
    {"date": "05-01", "name": "Labour Day"},
    {"date": "06-03", "name": "Martyrs' Day"},
    {"date": "06-09", "name": "National Heroes' Day"},
    {"date": "10-09", "name": "Independence Day"},
    {"date": "12-25", "name": "Christmas Day"},
    {"date": "12-26", "name": "Boxing Day"},
    # Variable dates
    {"name": "Eid al-Fitr", "variable": True},
    {"name": "Eid al-Adha", "variable": True},
]

# ============================================
# PHONE NUMBER FORMAT
# ============================================

PHONE_NUMBER_PATTERNS = {
    "mtn": ["077", "078"],
    "airtel": ["070", "075"],
    "africell": ["079"],
    "format": "+256-XXX-XXXXXX",
    "regex": r"^(\+?256|0)?[7][0-9]{8}$",
}

# ============================================
# BUSINESS HOURS
# ============================================

BUSINESS_HOURS = {
    "weekday": "8:00 AM - 8:00 PM",
    "saturday": "9:00 AM - 6:00 PM",
    "sunday": "10:00 AM - 4:00 PM",
}

# ============================================
# CUSTOMER SERVICE CHANNELS
# ============================================

CUSTOMER_SERVICE = {
    "whatsapp": "+256-XXX-XXXXXX",  # Replace with actual
    "phone": "+256-XXX-XXXXXX",
    "email": "hello@techmart.ug",
    "hours": BUSINESS_HOURS,
}

# ============================================
# LANGUAGES
# ============================================

SUPPORTED_LANGUAGES = [
    {"code": "en", "name": "English", "native": "English"},
    {"code": "lg", "name": "Luganda", "native": "Luganda"},
    # Future: Add more local languages
]

# ============================================
# VERIFICATION REQUIREMENTS
# ============================================

SELLER_VERIFICATION_DOCS = [
    "National ID",
    "Business License",
    "TIN Certificate",
    "Trade License",
]
