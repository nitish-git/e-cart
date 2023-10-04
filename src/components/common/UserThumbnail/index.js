import React from 'react'

export const UserThumbnail = ({ user }) => {
    const userInitials = user?.name.split(" ").slice(0, 2).map((e) => e.substr(0,1)).join("");

    return (
        <div className="user-avatar">
            {userInitials}
        </div>
    )
}
