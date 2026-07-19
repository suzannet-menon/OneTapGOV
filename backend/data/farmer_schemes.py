agriculture_schemes = [
    {
        "scheme_name": "PM-KISAN",
        "scheme_code": "AGR001",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Bank Passbook",
        ],
        "official_link": "https://pmkisan.gov.in",
    },
    {
        "scheme_name": "Kisan Credit Card",
        "scheme_code": "AGR002",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Income Proof",
            "Bank Passbook",
        ],
        "official_link": "https://www.myscheme.gov.in/schemes/kcc",
    },
    {
        "scheme_name": "Pradhan Mantri Fasal Bima Yojana",
        "scheme_code": "AGR003",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Crop Details",
            "Bank Passbook",
        ],
        "official_link": "https://pmfby.gov.in",
    },
    {
        "scheme_name": "Soil Health Card Scheme",
        "scheme_code": "AGR004",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Details",
        ],
        "official_link": "https://soilhealth.dac.gov.in",
    },
    {
        "scheme_name": "Agriculture Infrastructure Fund",
        "scheme_code": "AGR005",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Project Proposal",
            "Bank Passbook",
        ],
        "official_link": "https://agriinfra.dac.gov.in",
    },
    {
        "scheme_name": "Pradhan Mantri Kisan Maandhan Yojana",
        "scheme_code": "AGR006",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a small or marginal farmer",
            },
            {
                "field_name": "age",
                "comparison_operator": "between",
                "comparison_value": "18-40",
                "human_readable_condition": "Applicant's age must be between 18 and 40 years at enrolment",
            },
            {
                "field_name": "landholding_hectares",
                "comparison_operator": "<=",
                "comparison_value": "2",
                "human_readable_condition": "Cultivable landholding must not exceed 2 hectares",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Bank Passbook",
            "Age Proof",
        ],
        "official_link": "https://pmkmy.gov.in",
    },
    {
        "scheme_name": "Rashtriya Krishi Vikas Yojana",
        "scheme_code": "AGR007",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer or agri-entrepreneur",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Project Proposal",
            "Bank Passbook",
        ],
        "official_link": "https://rkvy.nic.in",
    },
    {
        "scheme_name": "Pradhan Mantri Krishi Sinchayee Yojana",
        "scheme_code": "AGR008",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Bank Passbook",
        ],
        "official_link": "https://pmksy.gov.in",
    },
    {
        "scheme_name": "Paramparagat Krishi Vikas Yojana",
        "scheme_code": "AGR009",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer willing to adopt organic farming as part of a cluster",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Bank Passbook",
        ],
        "official_link": "https://pgsindia-ncof.gov.in",
    },
    {
        "scheme_name": "National Agriculture Market (e-NAM)",
        "scheme_code": "AGR010",
        "category": "Agriculture",
        "conditions": [
            {
                "field_name": "is_farmer",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition": "Applicant must be a farmer or trader wanting to sell produce on the online market",
            },
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record",
            "Bank Passbook",
        ],
        "official_link": "https://enam.gov.in",
    },
]