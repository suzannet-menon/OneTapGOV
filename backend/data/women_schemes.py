women_schemes = [

    {
        "scheme_name": "Sukanya Samriddhi Yojana",
        "scheme_code": "WOM001",

        "conditions": [

            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Applicant should be female",
            },

        ],

        "documents": [
            "Guardian's identity proof( Aadhaar Card, PAN Card, Passport, Voter ID, Driving licence)",
            "Child's Birth Certificate",
            "Filled Sukanya Samriddhi Account Opening form",
            "Guardian's address proof(Aadhaar Card, Passport, Utility bill, Bank statement)"
        ],
    },

    {
        "scheme_name": "Pradhan Mantri Ujjwala Yojana",
        "scheme_code": "WOM002",

        "conditions": [

            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Applicant must be a woman",
            },

            {
                "field_name": "annual_income",
                "comparison_operator": "<=",
                "comparison_value": "800000",
                "human_readable_condition":
                    "Annual family income should not exceed ₹8 lakh",
            },

        ],

        "documents": [
            "Aadhaar Card",
            "KYC application form"
            "Ration Card",
            "Bank Passbook",
            "Deprivation Declaration",
            "Aadhaar copies of all family members listed in the family document"
        ],
    },

    {
        "scheme_name": "Working Women Hostel Scheme",
        "scheme_code": "WOM003",

        "conditions": [

            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Applicant must be a woman",
            },

            {
                "field_name": "is_worker",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Applicant must be employed",
            },

        ],

        "documents": [
            "Filled application form"
            "Aadhaar Card",
            "Employment Proof",
            "Bank Passbook",
            "Income certificate",
            "Educational or training institution proof",
            "Self declaration rergarding marital status"
        ],
    },

    {
        "scheme_name": "Mahila Samman Savings Certificate",
        "scheme_code": "WOM004",

        "conditions": [

            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Applicant must be a woman",
            },

        ],

        "documents": [
            "Filled account Opening Form"
            "Aadhaar Card",
            "PAN Card",
            "Bank Passbook",
        ],
    },

    {
        "scheme_name": "Beti Bachao Beti Padhao",
        "scheme_code": "WOM005",

        "conditions": [

            {
                "field_name": "is_woman",
                "comparison_operator": "==",
                "comparison_value": "true",
                "human_readable_condition":
                    "Scheme intended for girl child and women beneficiaries",
            },

        ],

        "documents": [
            "Birth Certificate",
            "Aadhaar Card",
            "Bank Passbook",
            "Address proof or guardian"
        ],
    },

]