import { createContext, useState, useContext, useCallback } from "react";
const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [bidPrice, setBidPrice] = useState(0);

  const updateBidPrice = useCallback((newBidPrice) => {
    setBidPrice(newBidPrice);
  }, []);
  return (
    <AuctionContext.Provider value={{ bidPrice, updateBidPrice }}>
      {children}
    </AuctionContext.Provider>
  );
};
export const useAuctionContext = () => {
  return useContext(AuctionContext);
};
