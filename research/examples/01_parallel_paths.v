// PROJECT EXAMPLE / ORIGINAL — bağımsız kombinasyonel yollar.
module parallel_paths (
    input  wire a,
    input  wire b,
    input  wire c,
    output wire left_path,
    output wire right_path,
    output wire combined
);
    assign left_path  = a & b;
    assign right_path = b | c;
    assign combined  = left_path ^ right_path;
endmodule
