
import React from 'react';
import { ArrowLeft, Award, Gift, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock loyalty data
const loyaltyData = {
  points: 750,
  tier: 'Silver',
  nextTier: 'Gold',
  pointsToNextTier: 250,
  rewards: [
    {
      id: 'reward1',
      name: '$5 Discount Coupon',
      points: 200,
      expires: '2023-06-30'
    },
    {
      id: 'reward2',
      name: 'Free Shipping',
      points: 300,
      expires: '2023-06-30'
    },
    {
      id: 'reward3',
      name: '$10 Discount Coupon',
      points: 500,
      expires: '2023-06-30'
    },
    {
      id: 'reward4',
      name: 'Premium Product 20% Off',
      points: 800,
      expires: '2023-06-30'
    }
  ],
  history: [
    {
      id: 'hist1',
      description: 'Earned points from order #ORD-1234',
      points: 120,
      date: '2023-05-01'
    },
    {
      id: 'hist2',
      description: 'Redeemed $5 Discount Coupon',
      points: -200,
      date: '2023-04-15'
    },
    {
      id: 'hist3',
      description: 'Earned points from order #ORD-9876',
      points: 80,
      date: '2023-04-10'
    }
  ]
};

const LoyaltyPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="app-container px-4 pt-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 -ml-2 text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Loyalty Program</h1>
      </div>
      
      {/* Points Overview */}
      <div className="bg-gradient-to-r from-primary to-purple-400 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center mb-3">
          <Award size={24} className="mr-2" />
          <h2 className="text-xl font-semibold">Loyalty Points</h2>
        </div>
        
        <div className="text-3xl font-bold mb-3">{loyaltyData.points} Points</div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Current Tier: {loyaltyData.tier}</span>
            <span>{loyaltyData.points} / 1000</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full">
            <div 
              className="bg-white h-full rounded-full"
              style={{ width: `${(loyaltyData.points / 1000) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">
            Earn {loyaltyData.pointsToNextTier} more points to reach {loyaltyData.nextTier} tier
          </p>
        </div>
      </div>
      
      {/* Available Rewards */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Available Rewards</h2>
        <div className="space-y-3">
          {loyaltyData.rewards.map((reward) => (
            <div 
              key={reward.id}
              className="bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Gift className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{reward.name}</h3>
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(reward.expires).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <button 
                className={`${
                  loyaltyData.points >= reward.points
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-500'
                } px-3 py-1.5 rounded-full text-sm font-medium`}
                disabled={loyaltyData.points < reward.points}
              >
                {reward.points} pts
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Points History */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Points History</h2>
        <div className="space-y-3">
          {loyaltyData.history.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-gray-100 rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.description}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-medium ${
                  item.points > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.points > 0 ? `+${item.points}` : item.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
