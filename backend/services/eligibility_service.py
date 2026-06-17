from typing import List, Dict, Any
from data.education_schemes import education_schemes
from data.farmer_schemes import agriculture_schemes
from data.women_schemes import women_schemes

class EligibilityService:
    @staticmethod
    def evaluate_condition(profile_value: Any, condition: Dict[str, Any]) -> bool:
        op = condition.get("comparison_operator")
        val = condition.get("comparison_value")
        
        # Convert profile_value to string for comparison if comparison_value is string
        # or handle numeric comparison
        if profile_value is None:
            return False
            
        # Standardize boolean strings
        if isinstance(val, str) and val.lower() in ["true", "false"]:
            profile_val_bool = str(profile_value).lower() == "true"
            val_bool = val.lower() == "true"
            if op == "==": return profile_val_bool == val_bool
            if op == "!=": return profile_val_bool != val_bool
            return False

        try:
            # Try numeric comparison
            p_val = float(profile_value)
            c_val = float(val)
            if op == "==": return p_val == c_val
            if op == "!=": return p_val != c_val
            if op == ">=": return p_val >= c_val
            if op == "<=": return p_val <= c_val
            if op == ">": return p_val > c_val
            if op == "<": return p_val < c_val
        except (ValueError, TypeError):
            # Fallback to string comparison
            p_val = str(profile_value).lower()
            c_val = str(val).lower()
            if op == "==": return p_val == c_val
            if op == "!=": return p_val != c_val
            
        return False

    @staticmethod
    def _normalize_profile(profile: Dict[str, Any]) -> Dict[str, Any]:
        """Maps database fields to requirement keys used in scheme data."""
        normalized = profile.copy()
        
        # Map existing fields
        normalized["annual_income"] = profile.get("income")
        normalized["percentage"] = profile.get("academic_performance")
        
        # Derive categorical flags
        sector = str(profile.get("sector", "")).lower()
        gender = str(profile.get("gender", "")).lower()
        
        normalized["is_student"] = "true" if "education" in sector or "student" in sector else "false"
        normalized["is_woman"] = "true" if gender == "female" else "false"
        normalized["is_farmer"] = "true" if "farmer" in sector or "agriculture" in sector else "false"
        
        # NOTE: 'is_worker' requires a specific field in the database. 
        # Assuming true if sector implies employment or worker status.
        # Update this logic if a dedicated 'is_employed' field exists in DB.
        normalized["is_worker"] = "true" if "worker" in sector or "employed" in sector else "false"
        
        return normalized

    @staticmethod
    def check_eligibility(profile: Dict[str, Any], scheme: Dict[str, Any]) -> Dict[str, Any]:
        eligible = True
        failed_conditions = []
        passed_conditions = []

        # Use normalized profile
        norm_profile = EligibilityService._normalize_profile(profile)

        for condition in scheme.get("conditions", []):
            field = condition.get("field_name")
            profile_value = norm_profile.get(field)
            
            if EligibilityService.evaluate_condition(profile_value, condition):
                passed_conditions.append(condition.get("human_readable_condition"))
            else:
                eligible = False
                failed_conditions.append(condition.get("human_readable_condition"))

        return {
            "is_eligible": eligible,
            "passed_conditions": passed_conditions,
            "failed_conditions": failed_conditions
        }

    @staticmethod
    def get_eligible_schemes(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        sector = profile.get("sector", "").lower()
        schemes_to_check = []
        
        if "education" in sector or "student" in sector:
            schemes_to_check = education_schemes
        elif "farmer" in sector or "agriculture" in sector:
            schemes_to_check = agriculture_schemes
        elif "women" in sector:
            schemes_to_check = women_schemes
        
        eligible_schemes = []
        for scheme in schemes_to_check:
            result = EligibilityService.check_eligibility(profile, scheme)
            if result["is_eligible"]:
                # Add extra info for recommendation/readiness
                scheme_data = scheme.copy()
                scheme_data["eligibility_details"] = result
                eligible_schemes.append(scheme_data)
        
        return eligible_schemes

    @staticmethod
    def calculate_readiness(required_documents: List[str], held_documents: List[str]) -> Dict[str, Any]:
        if not required_documents:
            return {"percentage": 100, "held_count": 0, "total_count": 0, "missing": []}
            
        # Ensure distinct comparison
        held = [doc for doc in required_documents if doc in held_documents]
        missing = [doc for doc in required_documents if doc not in held_documents]
        
        total = len(required_documents)
        percentage = int((len(held) / total) * 100)
        
        return {
            "percentage": percentage,
            "held_count": len(held),
            "total_count": total,
            "missing": missing
        }
