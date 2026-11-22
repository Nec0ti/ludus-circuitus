// PROJECT EXAMPLE / ORIGINAL — reset, clock'un yükselen kenarında örneklenir.
module one_bit_register (
    input  wire clk,
    input  wire reset,
    input  wire data_in,
    output reg  stored
);
    always @(posedge clk) begin
        if (reset)
            stored <= 1'b0;
        else
            stored <= data_in;
    end
endmodule
