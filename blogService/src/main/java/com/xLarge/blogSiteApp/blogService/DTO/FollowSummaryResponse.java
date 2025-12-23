package com.xLarge.blogSiteApp.blogService.DTO;

public class FollowSummaryResponse {

    private long followers;
    private boolean following;

    public FollowSummaryResponse(long followers, boolean following) {
        this.followers = followers;
        this.following = following;
    }

    public long getFollowers() {
        return followers;
    }

    public void setFollowers(long followers) {
        this.followers = followers;
    }

    public boolean isFollowing() {
        return following;
    }

    public void setFollowing(boolean following) {
        this.following = following;
    }
}


