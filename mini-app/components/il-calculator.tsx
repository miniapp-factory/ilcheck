"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function IlCalculator() {
  const [entryA, setEntryA] = useState(1);
  const [entryB, setEntryB] = useState(1);
  const [currentA, setCurrentA] = useState(1);
  const [currentB, setCurrentB] = useState(1);
  const [weightA, setWeightA] = useState(0.5);
  const [ilPercent, setIlPercent] = useState(0);
  const [valueHeld, setValueHeld] = useState(0);
  const [valuePool, setValuePool] = useState(0);
  const [breakEvenFee, setBreakEvenFee] = useState(0);

  useEffect(() => {

    // Impermanent loss for a 50/50 pool (simplified)
    const priceRatioA = currentA / entryA;
    const priceRatioB = currentB / entryB;
    const il =
      2 *
        Math.sqrt(priceRatioA * priceRatioB) -
      (priceRatioA + priceRatioB);
    const ilPct = il * 100;

    const held = entryA * entryA + entryB * entryB;
    const pool =
      2 *
      Math.sqrt(entryA * entryB * currentA * currentB) /
      Math.sqrt(entryA * entryB);

    const fee = ilPct / (100 - ilPct);

    setIlPercent(ilPct);
    setValueHeld(held);
    setValuePool(pool);
    setBreakEvenFee(fee);
  }, [entryA, entryB, currentA, currentB, weightA]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <h2 className="text-xl font-semibold">Impermanent Loss Calculator</h2>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="entryA">Entry Price A</Label>
            <Input
              id="entryA"
              type="number"
              value={entryA}
              onChange={(e) => setEntryA(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="entryB">Entry Price B</Label>
            <Input
              id="entryB"
              type="number"
              value={entryB}
              onChange={(e) => setEntryB(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="currentA">Current Price A</Label>
            <Input
              id="currentA"
              type="number"
              value={currentA}
              onChange={(e) => setCurrentA(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="currentB">Current Price B</Label>
            <Input
              id="currentB"
              type="number"
              value={currentB}
              onChange={(e) => setCurrentB(parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="weightA">Pool Weight A (0-1)</Label>
            <Input
              id="weightA"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={weightA}
              onChange={(e) => setWeightA(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid gap-2">
        <div className="flex justify-between">
          <span>Impermanent Loss:</span>
          <span>{ilPercent.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Value if Held:</span>
          <span>${valueHeld.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Value in Pool:</span>
          <span>${valuePool.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Break-even Fee APY:</span>
          <span>{breakEvenFee.toFixed(2)}%</span>
        </div>
      </CardFooter>
    </Card>
  );
}
