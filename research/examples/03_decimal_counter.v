// PROJECT EXAMPLE / ORIGINAL — çıkış 4 bittir; sayım aralığı onluk 0..9'dur.
module decimal_counter (
    input      wire       clk,
    input      wire       reset,
    output reg  [3:0]     value
);
    always @(posedge clk) begin
        if (reset)
            value <= 4'd0;
        else if (value == 4'd9)
            value <= 4'd0;
        else
            value <= value + 4'd1;
    end
endmodule
