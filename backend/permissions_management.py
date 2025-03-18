import database_execute

# Define user roles and their hierarchy
USER_ROLES = {
    "User": 1,
    "Homeowner": 2,
    "Admin": 3
}

def get_user_role(user_id):
    query = """
        SELECT role FROM Permissions WHERE userID = %s
    """
    result = database_execute.execute_SQL(query, (user_id,))
    return result[0][0] if result else None

def has_permission(requester_id, target_user_id):
    """
    Check if the requester has permission to modify the target user.
    """
    requester_role = get_user_role(requester_id)
    target_user_role = get_user_role(target_user_id)

    if requester_role and target_user_role:
        return USER_ROLES[target_user_role] > USER_ROLES[requester_role]
    return False

def can_modify_user(requester_id, target_user_id):
    if not has_permission(requester_id, target_user_id):
        raise PermissionError("Requester does not have permission to modify this user")

def get_user_permissions(user_id):
    query = """
        SELECT deviceManagement, statView FROM Permissions WHERE userID = %s
    """
    result = database_execute.execute_SQL(query, (user_id,))
    return result[0] if result else None

def set_role(user_id, role):
    query = """
        UPDATE Permissions SET role = %s WHERE userID = %s
    """
    database_execute.execute_SQL(query, (role, user_id))

def allow_device_management(user_id, device_management):
    query = """
        UPDATE Permissions SET deviceManagement = %s WHERE userID = %s
    """
    database_execute.execute_SQL(query, (device_management, user_id))

def allow_statView(user_id, statView):
    query = """
        UPDATE Permissions SET statView = %s WHERE userID = %s
    """
    database_execute.execute_SQL(query, (statView, user_id))