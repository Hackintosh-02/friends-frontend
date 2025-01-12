import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ChevronLeft, ChevronRight, UserMinus, UserPlus, Users, Mail } from 'lucide-react';

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsPage, setFriendsPage] = useState(0); // Pagination for friends
    const [recommendationsPage, setRecommendationsPage] = useState(0); // Pagination for recommendations
    const [activeTab, setActiveTab] = useState('friends'); // Tab management: friends or friendRequests

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

    // Handle rejecting a friend reque￼st
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
        <div className="min-h-screen bg-gradient-to-br bg-background dark:bg-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r bg-primary dark:bg-foreground-dark bg-clip-text text-transparent">
                    Welcome to Finder
                </h1>

                {/* Enhanced Tab Navigation */}
                <div className="flex gap-4 mb-8 bg-card/30 p-2 rounded-lg backdrop-blur-sm w-fit">
                    <Button
                        variant={activeTab === 'friends' ? 'default' : 'ghost'}
                        className={`px-6 py-2 transition-all duration-300 ${activeTab === 'friends' ? 'text-foreground-dark' : 'text-foreground dark:text-foreground-dark hover:bg-secondary'
                            }`}
                        onClick={() => setActiveTab('friends')}
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Friends
                    </Button>

                    <Button
                        variant={activeTab === 'friendRequests' ? 'default' : 'ghost'}
                        className={` px-6 py-2 transition-all duration-300 ${activeTab === 'friendRequests' ? 'text-foreground-dark' : 'text-foreground dark:text-foreground-dark hover:bg-secondary'}`}
                        onClick={() => setActiveTab('friendRequests')}
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        Friend Requests
                    </Button>
                </div>

                {activeTab === 'friends' && (
                    <>
                        {/* Friends Carousel Section */}
                        <section className="mb-12 relative">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <Users className="w-6 h-6 mr-2 text-primary dark:text-muted" />
                                Your Friends
                            </h2>

                            <div className="relative px-12">
                                <div className="grid grid-cols-5 gap-4">
                                    {friends.slice(friendsPage * 5, (friendsPage + 1) * 5).map((friend) => (
                                        <Card key={friend._id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border border-primary/10">
                                            <CardHeader className="p-4">
                                                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-white mx-auto mb-3 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-primary">
                                                        {friend.username[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-center text-lg">{friend.username}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-center text-sm text-muted-foreground mb-4">{friend.fullname}</p>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full bg-red-100 dark:text-primary group-hover:bg-destructive group-hover:text-white transition-colors duration-300"
                                                    onClick={() => handleUnfriend(friend._id)}
                                                >
                                                    <UserMinus className="w-4 h-4 mr-2" />
                                                    Unfriend
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Carousel Controls */}
                                {friends.length > 5 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10"
                                            onClick={() => setFriendsPage(Math.max(friendsPage - 1, 0))}
                                            disabled={friendsPage === 0}
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/10"
                                            onClick={() => setFriendsPage(friendsPage + 1)}
                                            disabled={(friendsPage + 1) * 5 >= friends.length}
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Recommendations Carousel Section */}
                        <section className="relative mb-12">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <Users className="w-6 h-6 mr-2 text-muted" />
                                Friend Recommendations
                            </h2>

                            <div className="relative px-12">
                                <div className="grid grid-cols-5 gap-4">
                                    {recommendations.slice(recommendationsPage * 5, (recommendationsPage + 1) * 5).map((rec) => (
                                        <Card key={rec._id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border border-primary/10">
                                            <CardHeader className="p-4">
                                                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-background mx-auto mb-3 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-primary">
                                                        {rec.username[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-center text-lg">{rec.username}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-center text-sm text-muted-foreground mb-4">
                                                    {getRecommendationLabel(rec)}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full bg-secondary text-white group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                                                    onClick={() => handleAddFriend(rec._id)}
                                                >
                                                    <UserPlus className="w-4 h-4 mr-2" />
                                                    Add Friend
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Carousel Controls */}
                                {recommendations.length > 5 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10"
                                            onClick={() => setRecommendationsPage(Math.max(recommendationsPage - 1, 0))}
                                            disabled={recommendationsPage === 0}
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full hover:bg-primary/10"
                                            onClick={() => setRecommendationsPage(recommendationsPage + 1)}
                                            disabled={(recommendationsPage + 1) * 5 >= recommendations.length}
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/* Friend Requests Section - Shows all requests */}
                {activeTab === 'friendRequests' && (
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center">
                            <Mail className="w-6 h-6 mr-2 text-primary dark:text-muted" />
                            Friend Requests
                        </h2>
                        <div className="w-full">
                            {friendRequests.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {friendRequests.map((req) => (
                                        <Card key={req._id} className="bg-card/50 backdrop-blur-sm border border-primary/10 hover:shadow-lg transition-all duration-300">
                                            <CardHeader className="p-4">
                                                <CardTitle className="flex items-center justify-between text-lg">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                            <span className="text-lg font-bold text-primary">
                                                                {req.fromUser.username[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <span>{req.fromUser.username}</span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                                    <span>{req.toUser.username}</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="flex gap-3">
                                                    <Button
                                                        className="flex-1 bg-primary/10 hover:bg-primary hover:text-white transition-colors duration-300"
                                                        onClick={() => handleAcceptRequest(req._id)}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex-1 hover:bg-destructive hover:text-white transition-colors duration-300"
                                                        onClick={() => handleRejectRequest(req._id)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card className="w-full bg-card/50 backdrop-blur-sm border border-primary/10 p-12">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="text-6xl mb-4">😢</div>
                                        <h3 className="text-2xl font-semibold mb-2">No Friend Requests Yet</h3>
                                        <p className="text-muted-foreground">
                                            When someone sends you a friend request, it will appear here.
                                        </p>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Home;
