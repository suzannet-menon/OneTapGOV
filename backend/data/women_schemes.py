women_schemes = [
    {
        "scheme_name": "Sukanya Samriddhi Yojana",
        "scheme_code": "WOM001",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant should be female",
            },
        ],
        "documents": [
            "Guardian's identity proof (Aadhaar Card, PAN Card, Passport, Voter ID, Driving licence)",
            "Child's Birth Certificate",
            "Filled Sukanya Samriddhi Account Opening form",
            "Guardian's address proof (Aadhaar Card, Passport, Utility bill, Bank statement)",
        ],
        "official_link": "https://www.nsiindia.gov.in",
    },
    {
        "scheme_name": "Pradhan Mantri Ujjwala Yojana",
        "scheme_code": "WOM002",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman",
            },
            {
                "field_name": "annual_income",
                "comparison_operator": "<=",
                "comparison_value": "800000",
                "human_readable_condition": "Annual family income should not exceed ₹8 lakh",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "KYC application form",
            "Ration Card",
            "Bank Passbook",
            "Deprivation Declaration",
            "Aadhaar copies of all family members listed in the family document",
        ],
        "official_link": "https://www.pmuy.gov.in",
    },
    {
        "scheme_name": "Working Women Hostel Scheme",
        "scheme_code": "WOM003",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman",
            },
            {
                "field_name": "is_worker",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be employed",
            },
        ],
        "documents": [
            "Filled application form",
            "Aadhaar Card",
            "Employment Proof",
            "Bank Passbook",
            "Income certificate",
            "Educational or training institution proof",
            "Self declaration regarding marital status",
        ],
        "official_link": "https://wcd.nic.in",
    },
    {
        "scheme_name": "Mahila Samman Savings Certificate",
        "scheme_code": "WOM004",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman",
            },
        ],
        "documents": [
            "Filled account Opening Form",
            "Aadhaar Card",
            "PAN Card",
            "Bank Passbook",
        ],
        "official_link": "https://www.nsiindia.gov.in",
    },
    {
        "scheme_name": "Beti Bachao Beti Padhao",
        "scheme_code": "WOM005",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Scheme intended for girl child and women beneficiaries",
            },
        ],
        "documents": [
            "Birth Certificate",
            "Aadhaar Card",
            "Bank Passbook",
            "Address proof of guardian",
        ],
        "official_link": "https://wcd.nic.in",
    },
    {
        "scheme_name": "Pradhan Mantri Matru Vandana Yojana",
        "scheme_code": "WOM006",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a pregnant or lactating woman",
            },
            {
                "field_name": "is_first_or_second_child",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Benefit applies to the first living child, or the second child if a girl",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Bank Passbook",
            "Mother-Child Health (MCH) Card",
            "Antenatal Check-up (ANC) Record",
        ],
        "official_link": "https://pmmvy.wcd.gov.in",
    },
    {
        "scheme_name": "Mahila Shakti Kendra",
        "scheme_code": "WOM007",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman seeking skill development or community support services",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Address Proof",
        ],
        "official_link": "https://wcd.nic.in",
    },
    {
        "scheme_name": "One Stop Centre Scheme",
        "scheme_code": "WOM008",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman affected by violence, in need of medical, legal, or counselling support",
            },
        ],
        "documents": [
            "Aadhaar Card (if available)",
            "Any identity proof",
        ],
        "official_link": "https://wcd.nic.in",
    },
    {
        "scheme_name": "Stand-Up India",
        "scheme_code": "WOM009",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman entrepreneur setting up a greenfield enterprise",
            },
            {
                "field_name": "is_entrepreneur",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be starting a new manufacturing, services, or trading enterprise",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "Business Plan",
            "Bank Passbook",
            "Category Certificate (if applicable)",
        ],
        "official_link": "https://www.standupmitra.in",
    },
    {
        "scheme_name": "Support to Training and Employment Programme for Women (STEP)",
        "scheme_code": "WOM010",
        "category": "Women Welfare",
        "conditions": [
            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a woman aged 16 or above seeking skill training for employment or self-employment",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Age Proof",
            "Address Proof",
        ],
        "official_link": "https://wcd.nic.in",
    },
]