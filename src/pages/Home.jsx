import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsPage, setFriendsPage] = useState(0); // Pagination for friends
    const [recommendationsPage, setRecommendationsPage] = useState(0); // Pagination for recommendations

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Fetch user's friends
                const friendsResponse = await axios.get('http://localhost:5000/api/friends/friends', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFriends(friendsResponse.data.friends);

                // Fetch recommendations
                const recommendationsResponse = await axios.get(
                    'http://localhost:5000/api/friends/recommendations',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setRecommendations(recommendationsResponse.data.recommendations);

                // Fetch friend requests
                const requestsResponse = await axios.get(
                    'http://localhost:5000/api/friends/requests',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFriendRequests(requestsResponse.data.requests);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    // Handle adding a friend
    const handleAddFriend = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/friends/request',
                { toUserId: friendId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRecommendations(recommendations.filter((rec) => rec._id !== friendId)); // Remove added friend from recommendations
        } catch (err) {
            console.error('Error adding friend:', err);
        }
    };

    // Handle unfriending a friend
    const handleUnfriend = async (friendId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/friends/unfriend',
                { friendId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFriends(friends.filter((friend) => friend._id !== friendId)); // Remove friend from the list
        } catch (err) {
            console.error('Error unfriending:', err);
        }
    };

    // Handle accepting a friend request
    const handleAcceptRequest = async (requestId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/friends/accept',
                { requestId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFriendRequests(friendRequests.filter((req) => req._id !== requestId)); // Remove request from the list
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };

    // Handle rejecting a friend request
    const handleRejectRequest = async (requestId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/friends/reject',
                { requestId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFriendRequests(friendRequests.filter((req) => req._id !== requestId)); // Remove request from the list
        } catch (err) {
            console.error('Error rejecting friend request:', err);
        }
    };

    // Render Recommendation Label
    const getRecommendationLabel = (rec) => {
        if (rec.mutualConnections > 0 && rec.sharedInterests > 0) {
            return `${rec.mutualConnections} mutual connections, ${rec.sharedInterests} interests match`;
        }
        if (rec.mutualConnections > 0) {
            return `${rec.mutualConnections} mutual connections`;
        }
        if (rec.sharedInterests > 0) {
            return `${rec.sharedInterests} interests match`;
        }
        return 'Make new friends';
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Finder</h1>

            {/* Friends Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
                <div className="grid grid-cols-2 gap-4">
                    {friends.slice(friendsPage * 5, (friendsPage + 1) * 5).map((friend) => (
                        <Card key={friend._id}>
                            <CardHeader>
                                <CardTitle>{friend.username}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{friend.fullname}</p>
                                <Button onClick={() => handleUnfriend(friend._id)}>Unfriend</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <Button onClick={() => setFriendsPage(Math.max(friendsPage - 1, 0))}>Previous</Button>
                    <Button onClick={() => setFriendsPage(friendsPage + 1)}>Next</Button>
                </div>
            </section>

            {/* Friend Requests Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Friend Requests</h2>
                <div className="grid grid-cols-2 gap-4">
                    {friendRequests.map((req) => (
                        <Card key={req._id}>
                            <CardHeader>
                                <CardTitle>
                                    {req.fromUser.username} → {req.toUser.username}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => handleAcceptRequest(req._id)}>Accept</Button>
                                <Button onClick={() => handleRejectRequest(req._id)} className="ml-4">
                                    Reject
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Recommendations Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Friend Recommendations</h2>
                <div className="grid grid-cols-2 gap-4">
                    {recommendations.slice(recommendationsPage * 5, (recommendationsPage + 1) * 5).map((rec) => (
                        <Card key={rec._id}>
                            <CardHeader>
                                <CardTitle>{rec.username}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{getRecommendationLabel(rec)}</p>
                                <Button onClick={() => handleAddFriend(rec._id)}>Add Friend</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <Button onClick={() => setRecommendationsPage(Math.max(recommendationsPage - 1, 0))}>
                        Previous
                    </Button>
                    <Button onClick={() => setRecommendationsPage(recommendationsPage + 1)}>Next</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
